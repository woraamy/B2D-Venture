/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        instrumentationHook: true,
    },
    images: {
        domains: ["storage.googleapis.com",
                  "storage.cloud.google.com"
        ], // Correct domain
    },
};

export default nextConfig;
