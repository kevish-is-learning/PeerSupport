/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Keep `next dev` isolated from `next build`. Running a production build
  // while the dev server is open must not replace its active compiler cache.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
