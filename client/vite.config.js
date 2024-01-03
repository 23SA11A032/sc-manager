import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        watch: {
            usePolling: true,
        },
        proxy: {
            "/api": "http://localhost:3001",
        },
    },
    preview: {
        host: true,
        port: 3000,
    },
});
