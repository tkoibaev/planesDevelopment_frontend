// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//     app.use(createProxyMiddleware("/api", { target: "http://localhost:3090" }));
// };

import { createProxyMiddleware } from "http-proxy-middleware";

export default function setupProxy(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://127.0.0.1:8000", // Замените на URL вашего бэкэнд-сервера
      changeOrigin: true,
    })
  );
}
