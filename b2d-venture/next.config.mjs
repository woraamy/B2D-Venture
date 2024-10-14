/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        instrumentationHook: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
                pathname: '/**',  // Allows any path
            },
            {
                protocol: 'https',
                hostname: 'storage.cloud.google.com',
                pathname: '/**',  // Allows any path
            },
        ],
    },
};

export default nextConfig;
