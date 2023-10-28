// src/pages/_app.tsx
import ViewportProvider from '@/utils/ViewportProvider'
import { withTRPC } from '@trpc/next'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import superjson from 'superjson'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { mainnet, optimism, polygon } from 'wagmi/chains'

import type { AppRouter } from '../server/router'
import '../styles/globals.css'

// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
	throw new Error('You need to provide NEXT_PUBLIC_PROJECT_ID env variable')
}
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

// 2. Configure wagmi client
const chains = [mainnet, polygon, optimism]

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
	autoConnect: true,
	connectors: w3mConnectors({ chains, projectId }),
	publicClient,
})

// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiConfig, chains)

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) => {
	const [ready, setReady] = useState(false)

	useEffect(() => {
		setReady(true)
	}, [])

	return (
		<>
			{ready ? (
				<WagmiConfig config={wagmiConfig}>
					<SessionProvider session={session}>
						<ViewportProvider>
							<Component {...pageProps} />
						</ViewportProvider>
					</SessionProvider>
				</WagmiConfig>
			) : null}
			<Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
		</>
	)
}

const getBaseUrl = () => {
	if (typeof window !== 'undefined') {
		return ''
	}
	if (process.browser) return '' // Browser should use current path
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url

	return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
	config({ ctx }) {
		/**
		 * If you want to use SSR, you need to use the server's full URL
		 * @link https://trpc.io/docs/ssr
		 */
		const url = `${getBaseUrl()}/api/trpc`

		return {
			url,
			transformer: superjson,
			/**
			 * @link https://react-query.tanstack.com/reference/QueryClient
			 */
			// queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
		}
	},
	/**
	 * @link https://trpc.io/docs/ssr
	 */
	ssr: false,
})(MyApp)
