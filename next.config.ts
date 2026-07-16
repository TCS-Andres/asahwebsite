import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
    The live WordPress site serves every URL with a trailing slash and the
    redirect map plus the three preserved blog URLs depend on that shape.
  */
  trailingSlash: true,
};

export default nextConfig;
