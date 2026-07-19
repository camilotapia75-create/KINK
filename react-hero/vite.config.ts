import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // serve the parent site's assets (hero video) without duplicating them in git
  publicDir: "../assets",
});
