import type { NextConfig } from "next";

const aureumOrigin = "https://aureum-focus-2351.solarporpoise128.chatgpt.site";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/aureum", destination: `${aureumOrigin}/aureum` },
      { source: "/aureum/:path*", destination: `${aureumOrigin}/aureum/:path*` },
    ];
  },
};

export default nextConfig;
