/**
 * @type {import('next').NextConfig}
 */
const nextConfig = { 
    trailingSlash: true,
    env: {
        host: `http://cms.datatangente.com/`,
    }
}
module.exports = nextConfig;