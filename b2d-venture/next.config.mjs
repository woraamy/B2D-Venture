/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        instrumentationHook: true,
    },
    images: {
        domains: ['storage.googleapis.com'], // Allow images from GCS
      },
 
};

export default nextConfig;
