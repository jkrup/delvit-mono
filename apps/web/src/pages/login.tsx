import AuthButton from '@/components/mobile/partials/AuthButton'
import Button from '@/components/mobile/partials/Button'
import TextInput from '@/components/mobile/partials/TextInput'
import WalletConnectButton from '@/components/mobile/partials/WalletConnectButton'
import ArticlesFeed from '@/components/webview/ArticlesFeed'
import PopularTopics from '@/components/webview/PopularTopics'
import UserMenu from '@/components/webview/UserMenu'
import { useViewPort } from '@/hooks/useViewPort'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useWeb3Modal } from '@web3modal/react'
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SiWalletconnect } from 'react-icons/si'
import { SiweMessage } from 'siwe'
import { useAccount, useConnect, useNetwork, useSignMessage } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import hstkLogoUrl from '../imgs/hstk-logo.png'

// Skeleton that will be blurred
const HomePage = () => {
	return (
		<div>
			<div className='bg-black h-24 flex flex-row p-4 justify-between overflow-hidden'>
				<Link href='/' legacyBehavior>
					<img src={hstkLogoUrl.src} width={'64px'} height={'64px'} />
					{/* <Bars3Icon className='w-10 relative' /> */}
				</Link>
				<form className='grow my-auto flex-wrap space-x-4 mx-8 justify-center max-w-screen-xl hidden sm:flex'>
					<div className='flex items-center bg-neutral-100 bg-opacity-50 text-stone-400 space-x-2 flex-1 rounded-sm px-2 overflow-hidden text-zinc-600 focus:text-zinc-400'>
						<MagnifyingGlassIcon className='w-6' />
						<input
							className='grow max-w-screen-xl bg-neutral-100 bg-opacity-0 h-8 placeholder:text-zinc-300 focus:placeholder:text-zinc-400 flex-1 outline-none'
							type='text'
							placeholder='Search Truth'
							name='search'
						/>
					</div>
					<button className='rounded px-10 py-2 text-neutral-600 font-medium bg-neutral-100'>Search</button>
				</form>
				<UserMenu />
			</div>
			<div className='pt-4 bg-zinc-700 min-h-screen overflow-hidden'>
				<div className='grid grid-cols-3 gap-4 max-w-screen-xl mx-auto'>
					{/* Main SubSection */}
					<ArticlesFeed />

					{/* Right SubSection */}
					<div className='flex flex-col space-y-2'>
						{' '}
						{/* Col 2 */}
						{/* <TopContent /> */}
						<PopularTopics />
					</div>
				</div>
			</div>
		</div>
	)
}

const LoginPage: React.FC = () => {
	const { width } = useViewPort()
	const { data: session } = useSession()
	const [loggingIn, setLoggingIn] = useState(false)
	const { chain } = useNetwork()
	const { isConnected, address } = useAccount()
	const { signMessageAsync } = useSignMessage()
	const { open } = useWeb3Modal()
	const { connect } = useConnect({
		connector: new InjectedConnector(),
	})

	const router = useRouter()

	const loginWithMetamask = async () => {
		setLoggingIn(true)
		if ((window as any).ethereum) {
			try {
				const ethereum = (window as any).ethereum as any
				const req = await ethereum.request({ method: 'eth_requestAccounts' })
				if (req.length === 0) {
					throw new Error('No MetaMask accounts')
				}
				const address = req[0] //TODO: fetch nonce

				const signature: string = await ethereum.request({
					method: 'personal_sign',
					params: [address, 'Login to DLV'], //TODO: add nonce
					from: address,
				})

				console.log(signature)

				signIn('metamask', {
					signature,
					address,
					callbackUrl: '/profile',
				}).then((sir) => {
					console.log(sir)
				})
			} catch (err) {
				console.error(err)
				setLoggingIn(false)
				return
			}
		} else {
			// Error no metamask detected
			alert('No metamask detected')
			setLoggingIn(false)
		}
	}

	const loginWithWalletConnect = async () => {
		if (!isConnected) open()
		try {
			const message = new SiweMessage({
				domain: window.location.host,
				uri: window.location.origin,
				version: '1',
				address: address,
				statement: process.env.NEXT_PUBLIC_SIGNIN_MESSAGE,
				nonce: await getCsrfToken(),
				chainId: chain?.id,
			})

			const signedMessage = await signMessageAsync({
				message: message.prepareMessage(),
			})

			const response = await signIn('walletconnect', {
				message: JSON.stringify(message),
				signedMessage,
				redirect: true,
				callbackUrl: '/profile',
			})
			if (response?.error) {
				console.log('Error occured:', response.error)
			}
		} catch (error) {
			console.log('Error Occured', error)
		}
	}

	if (router.query['auto'] === 'google') {
		signIn('google')
	}
	if (router.query['auto'] === 'facebook') {
		signIn('facebook')
	}

	if (router.query['auto'] === 'metamask') {
		const q = router.query
		delete q['auto']
		loginWithMetamask()
	}

	if (session) {
		setTimeout(() => router.replace('/'), 0)
		return (
			<div>
				Signed in as {session.user?.name} <br />
				<button
					onClick={() =>
						signOut().then(() => {
							router.replace('/')
						})
					}
				>
					Sign out
				</button>
			</div>
		)
	}
	return (
		<div className=''>
			<Head>
				<title>Delvit | Login</title>
				<meta name='description' content='Delvit' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{width > 992 ? (
				<div>
					<div className='blur'>
						<HomePage />
					</div>
					<div className='absolute top-0 left-0 w-full grid min-h-screen'>
						<div
							className={
								'm-auto bg-zinc-800/75 p-12 py-4 w-[280px] sm:w-[400px] rounded-xl drop-shadow-2xl flex flex-col space-y-3' +
								(loggingIn && ' blur')
							}
						>
							<div className='mx-auto'>
								<Image
									alt='Delvit Logo'
									className='cursor-pointer rounded-full mx-4 h-[64px] w-[64px]'
									src={hstkLogoUrl}
								/>
							</div>
							<div className='pb-4 text-center w-full flex flex-col'>
								<h2 className='text-3xl pb-4 text-white'>Login With:</h2>
								<button
									className={
										'text-xl justify-center rounded-xl font-bold p-4 my-2 bg-yellow-600 hover:bg-yellow-500 hover:drop-shadow text-white flex items-center'
									}
									onClick={() => signIn('email')}
								>
									Email
								</button>
								<button
									className={
										'text-xl justify-center rounded-xl font-bold p-4 my-2 bg-yellow-600 hover:bg-yellow-500 hover:drop-shadow text-white flex items-center'
									}
									onClick={() => signIn('google')}
								>
									Google
								</button>
								<button
									className={
										'justify-center rounded-xl font-bold p-4 my-2 bg-yellow-600 hover:bg-yellow-500 hover:drop-shadow text-white flex items-center'
									}
									onClick={() => loginWithMetamask()}
								>
									<div className='w-8 mr-2'>
										<img alt='Login with MetaMask' src='/metamask.svg' />
									</div>
									<div className='text-xl'>Metamask</div>
								</button>
								<WalletConnectButton
									label='Walletconnect'
									icon={
										<div className=''>
											<SiWalletconnect className='w-6 h-6' />
										</div>
									}
									onClick={loginWithWalletConnect}
								/>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className='p-12 pb-20 h-screen w-screen bg-white'>
					<div className='pt-8'>
						<div className='flex items-center justify-center'>
							<Image
								width={107}
								height={107}
								alt='Delvit Logo'
								className='cursor-pointer rounded-full mx-4'
								src={'/logo-white.svg'}
							/>
						</div>
						<h2 className='text-center my-6 font-semibold text-gray-700 text-2xl'>Login</h2>
						<TextInput value='' placeholder='Enter your email' onChange={() => null} />
						<TextInput value='' placeholder='Password' onChange={() => null} />
						<h5 className='text-gray-600 text-right text-sm font-light'>Forget password?</h5>
						<div className='mt-8 mb-12 flex justify-center'>
							<Button
								classname='rounded-full text-white text-sm px-6 py-3 bg-gold'
								title='LOGIN'
								onChange={() => null}
							/>
						</div>

						<div>
							<AuthButton
								icon={
									<div>
										<Image src={'/google.svg'} width={32} height={32} alt='google icon' />
									</div>
								}
								onClick={() => signIn('google')}
								text='Sign in with Google'
							/>
							<AuthButton
								icon={
									<div>
										<Image src={'/metamask.svg'} width={32} height={32} alt='metamask icon' />
									</div>
								}
								onClick={loginWithMetamask}
								text='Sign in with Metamask'
							/>
							<AuthButton
								icon={
									<div className=''>
										<SiWalletconnect className='w-6 h-6' />
									</div>
								}
								onClick={loginWithWalletConnect}
								text='Sign in with Walletconnect'
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default LoginPage
