import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // разрешает принимать запросы с любого хоста (нужно для ngrok)
    port: 3000, // порт (можно изменить, если нужно)
    strictPort: true, // порт занят — не переключаться на другой
  },
});
