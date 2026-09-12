import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // These are athlete-owned runtime stores, never build assets. Keep the separately
  // committed knowledge-base-defaults available for fresh installs and missing files.
  outputFileTracingExcludes: {
    "/*": ["./data/**/*", "./knowledge-base/**/*"],
  },
};

export default nextConfig;
