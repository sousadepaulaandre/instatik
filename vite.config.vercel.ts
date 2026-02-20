import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

// Use process.cwd() for Vercel compatibility
const rootDir = process.cwd();

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.join(rootDir, "client", "src"),
      "@shared": path.join(rootDir, "shared"),
    },
  },
  root: path.join(rootDir, "client"),
  build: {
    outDir: path.join(rootDir, "dist", "public"),
    emptyOutDir: true,
  },
});
