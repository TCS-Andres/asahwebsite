import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
    The live WordPress site serves every URL with a trailing slash and the
    redirect map plus the three preserved blog URLs depend on that shape.
  */
  trailingSlash: true,
  /*
    Blog routes revalidate hourly so scheduled posts publish on their date.
    Those runtime re-renders read content/blog from disk, so the post files
    must ship inside the server bundle.
  */
  outputFileTracingIncludes: {
    "/*": ["./content/blog/**/*"],
  },
};

export default nextConfig;
