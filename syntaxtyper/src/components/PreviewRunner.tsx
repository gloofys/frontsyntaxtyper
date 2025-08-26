// src/components/PreviewRunner.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";

type PreviewMode = "console" | "dom" | "canvas";

interface PreviewRunnerProps {
    userCode: string;          // code from the editor (verbatim)
    tests?: string;            // optional validation code (throws on failure)
    mode?: PreviewMode;        // "console" just logs; "dom" renders into #app
    html?: string;             // optional HTML skeleton for DOM tasks
    css?: string;              // optional CSS for DOM tasks
    autoRun?: boolean;
}

type TestResult = { passed: boolean; message?: string };

export default function PreviewRunner({
                                          userCode,
                                          tests,
                                          mode = "console",
                                          html,
                                          css,
                                          autoRun = true,
                                      }: PreviewRunnerProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [logs, setLogs] = useState<string[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const [testResult, setTestResult] = useState<TestResult | null>(null);
    const [snapshotUrl, setSnapshotUrl] = useState<string | null>(null);

    // Prevent </script> from breaking our inline script block
    const escapeForScript = (s: string) => s.replaceAll("</script>", "<\\/script>");

    const srcDoc = useMemo(() => {
        const bodyHtml =
            mode === "dom"
                ? (html ?? "<div id='app'></div>")
                : "<div id='app' style='font:14px/1.4 ui-monospace, SFMono-Regular, Menlo;'>Open Console tab</div>";

        const cssBlock = css ? `<style>${css}</style>` : "";

        const code = escapeForScript(userCode ?? "");
        const testCode = escapeForScript(
            tests
                ? `
try {
  ${tests}
  parent.postMessage({ source: 'syntax-iframe', type: 'tests', payload: { passed: true } }, '*');
} catch (e) {
  parent.postMessage({ source: 'syntax-iframe', type: 'tests', payload: { passed: false, message: String(e) } }, '*');
}
`
                : ""
        );

        // NOTE: no allow-same-origin => unique origin (safer). We use postMessage for comms.
        return `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    ${cssBlock}
    <style>
      body { margin: 0; padding: 12px; }
    </style>
  </head>
  <body>
    ${bodyHtml}
    <script>
      (function () {
        const send = (type, payload) =>
          parent.postMessage({ source: 'syntax-iframe', type, payload }, '*');

        // Capture logs + errors
        const _log = console.log;
        console.log = (...args) => {
          try { _log.apply(console, args); } catch {}
          try { send('log', { line: args.map(a => String(a)).join(' ') }); } catch {}
        };
        window.addEventListener('error', (e) => {
          send('error', { message: String(e.message || e.error || e) });
        });

        // Provide a minimal DOM mount for DOM tasks
        const mount = document.getElementById('app');

        try {
          // User code runs here
          ${code}
        } catch (e) {
          send('error', { message: String(e) });
        }

        // Run tests (if provided)
        ${testCode}

        // Snapshot support (optional)
        window.addEventListener('message', async (evt) => {
          if (!evt || !evt.data || evt.data.type !== 'snapshot') return;
          // Lazy-load html2canvas for DOM → PNG
          const go = () => window.html2canvas(document.body).then(canvas => {
            send('snapshot', { dataUrl: canvas.toDataURL('image/png') });
          }).catch(e => send('error', { message: 'snapshot failed: ' + e }));
          if (!window.html2canvas) {
            const s = document.createElement('script');
            s.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
            s.onload = go;
            s.onerror = () => send('error', { message: 'Could not load html2canvas' });
            document.head.appendChild(s);
          } else { go(); }
        });
      })();
    </script>
  </body>
</html>
`.trim();
    }, [userCode, tests, mode, html, css]);

    useEffect(() => {
        const onMessage = (evt: MessageEvent) => {
            const d = evt.data;
            if (!d || d.source !== "syntax-iframe") return;
            if (d.type === "log") setLogs((prev) => [...prev, d.payload.line]);
            if (d.type === "error") setErrors((prev) => [...prev, d.payload.message]);
            if (d.type === "tests") setTestResult(d.payload);
            if (d.type === "snapshot") setSnapshotUrl(d.payload.dataUrl);
        };
        window.addEventListener("message", onMessage);
        return () => window.removeEventListener("message", onMessage);
    }, []);

    useEffect(() => {
        if (!autoRun) return;
        // Reset state when code changes
        setLogs([]);
        setErrors([]);
        setTestResult(null);
        setSnapshotUrl(null);
    }, [userCode, tests, autoRun]);

    const requestSnapshot = () => {
        setSnapshotUrl(null);
        iframeRef.current?.contentWindow?.postMessage({ type: "snapshot" }, "*");
    };

    return (
        <div className="rounded-2xl border border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 text-sm bg-neutral-900">
                <div className="flex gap-3 items-center">
                    <span className="opacity-80">Preview</span>
                    {testResult && (
                        <span
                            className={
                                "px-2 py-0.5 rounded-full " +
                                (testResult.passed ? "bg-green-700/40 text-green-200" : "bg-red-700/40 text-red-200")
                            }
                            title={testResult.message || ""}
                        >
              {testResult.passed ? "Tests passed" : "Tests failed"}
            </span>
                    )}
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={requestSnapshot}
                        className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700"
                        title="Render a PNG snapshot of the output"
                    >
                        Snapshot
                    </button>
                </div>
            </div>

            <iframe
                ref={iframeRef}
                title="syntax-preview"
                sandbox="allow-scripts"
                srcDoc={srcDoc}
                style={{ width: "100%", height: 260, background: "white" }}
            />

            <div className="grid grid-cols-2 gap-0 border-t border-neutral-800">
                <div className="p-2 text-xs font-mono bg-neutral-950 text-neutral-100 min-h-24">
                    <div className="mb-1 opacity-70">Console</div>
                    {logs.length === 0 ? (
                        <div className="opacity-50">— no output —</div>
                    ) : (
                        logs.map((l, i) => <div key={i}>{l}</div>)
                    )}
                    {errors.length > 0 && (
                        <>
                            <div className="mt-2 opacity-70">Errors</div>
                            {errors.map((e, i) => (
                                <div key={i} className="text-red-300">
                                    {e}
                                </div>
                            ))}
                        </>
                    )}
                </div>
                <div className="p-2 bg-neutral-900 text-neutral-100">
                    <div className="mb-1 text-xs opacity-70">Picture</div>
                    {snapshotUrl ? (
                        <img src={snapshotUrl} alt="snapshot" style={{ maxWidth: "100%", borderRadius: 8 }} />
                    ) : (
                        <div className="text-xs opacity-50">Click “Snapshot” to capture the preview as an image.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
