/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["mui-tel-input"],
  async redirects() {
    return [{ source: "/", destination: "/products", permanent: true }];
  },
};

module.exports = nextConfig;
