import { env } from "./src/env/server.mjs";

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

const ContentSecurityPolicy = `default-src 'self' vitals.vercel-insights.com`;
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
];

export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
});
