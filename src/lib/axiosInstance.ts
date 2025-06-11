import axios from "axios";

const api = axios.create({
  baseURL: process.env.CONNECTION_URL_PRODUCTION,
  withCredentials: false,
  headers: {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "Referrer-Policy": "no-referrer",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
    "Cache-Control": "no-store",
    Pragma: "no-cache",
    "Content-Security-Policy": "default-src 'self'",
    "Expect-CT": "max-age=86400, enforce",
  },
});

export default api;
