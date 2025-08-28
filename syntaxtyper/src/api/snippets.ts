// src/api/snippets.ts
// src/api/snippets.ts
import type {Snippet} from "../data/snippets/Snippet";

// Import all snippets across all languages statically
const allSnippetModules = import.meta.glob("../data/snippets/*/*.ts");

export const fetchSnippet = async (language?: string): Promise<Snippet | null> => {
    try {
        // Get all available snippet paths
        const paths = Object.keys(allSnippetModules);
        if (paths.length === 0) return null;

        // Filter by language if provided
        const filteredPaths = language
            ? paths.filter((path) => path.includes(`/snippets/${language}/`))
            : paths;

        if (filteredPaths.length === 0) return null;

        // Pick a random snippet from the filtered list
        const randomIndex = Math.floor(Math.random() * filteredPaths.length);
        const path = filteredPaths[randomIndex];

        // Dynamically import the snippet module
        const module = await allSnippetModules[path]();
        return module.default;
    } catch (error) {
        console.error("❌ Error fetching snippet:", error);
        return null;
    }
};
