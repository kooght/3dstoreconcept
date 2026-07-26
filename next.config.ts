import type { NextConfig } from "next";
import path from "path";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  basePath: isGitHubPages ? "/3dstoreconcept" : "",
  assetPrefix: isGitHubPages ? "/3dstoreconcept/" : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  ...(isGitHubPages
    ? {
        turbopack: {
          resolveAlias: {
            "@/app/actions": "./lib/actions-stub.ts",
          },
        },
        webpack: (config) => {
          config.resolve = config.resolve || {};
          config.resolve.alias = {
            ...config.resolve.alias,
            "@/app/actions": path.resolve(__dirname, "lib/actions-stub.ts"),
          };
          return config;
        },
      }
    : {}),
  env: {
    NEXT_PUBLIC_STATIC_EXPORT: isGitHubPages ? "true" : "false",
  },
};

export default nextConfig;
