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
    reactStrictMode: true,
    swcMinify: true,
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Permissions-Policy',
                        value:
                        "camera=(); battery=(self); browsing-topics=(); geolocation=(); microphone=()",
                        //Empty brackets are used to define that we are denying them..
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    }
                ],
            },
        ];
    },
}

export default nextConfig;
