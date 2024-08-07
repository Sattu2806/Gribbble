/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[{
            hostname:'avatars.githubusercontent.com',
            protocol:'https',
        },{
            hostname:'res.cloudinary.com',
        }]
    }
};

export default nextConfig;
