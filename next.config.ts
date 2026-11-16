import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Gateway Intelligence site is a static page in public/gatewayintel.
  // These rewrites serve it at clean URLs on this domain (no redirect away).
  async rewrites() {
    return [
      { source: "/gatewayintel", destination: "/gatewayintel/index.html" },
      {
        source: "/gatewayintel/checklist",
        destination: "/gatewayintel/checklist.html",
      },
    ];
  },
};

export default nextConfig;
