//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const withPWA = require('next-pwa')({
	dest: 'public',
	disable: process.env.NODE_ENV === 'development',
	scope: '/',
})
/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/

const nextConfig = {
	nx: {
		// Set this to true if you would like to use SVGR
		// See: https://github.com/gregberge/svgr
		svgr: false,
	},
	reactStrictMode: true,
	images: {
		domains: ['ipfs.io', 'i.imgur.com', 'cloudflare-ipfs.com'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*.googleusercontent.com',
				pathname: '/a/**',
			},
			{
				protocol: 'https',
				hostname: '*.dweb.link',
				pathname: '**',
			},
		],
	},
	output: 'standalone',
};

const plugins = [
	// Add more Next.js plugins to this list if needed.
	withNx,
	withPWA
];

module.exports = composePlugins(...plugins)(nextConfig);
