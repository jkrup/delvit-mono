import { useViewPort } from '@/hooks/useViewPort'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import hstkLogoUrl from '../../imgs/hstk-logo.png'
import UserMenu from './UserMenu'

const Header = () => {
	const { status } = useSession()
	const router = useRouter()
	const { width } = useViewPort()

	const onSearch: React.FormEventHandler = (e) => {
		e.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement)
		const search = formData.get('search') as string

		router.push({
			pathname: '/',
			query: {
				q: search,
				type: router.query['type'] || 'posts',
			},
		})
	}

	if (status === 'unauthenticated') {
		router.replace('/login')
	}

	return (
		<>
			{width > 992 ? (
				<div className='h-24 bg-white p-4'>
					<div className='flex flex-row justify-between items-center max-w-screen-xl mx-auto'>
						<Link href='/' legacyBehavior>
							<img src={hstkLogoUrl.src} width={'64px'} height={'64px'} />
							{/* <Bars3Icon className='w-10 relative' /> */}
						</Link>
						<form
							className='grow my-auto flex-wrap space-x-4 mx-8 justify-center max-w-screen-xl hidden sm:flex'
							onSubmit={onSearch}
						>
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
				</div>
			) : (
				<div className='p-4  border-b-2 border-gray-100'>
					<form onSubmit={onSearch}>
						<input
							className='bg-neutral-100 p-2 w-full rounded placeholder:text-zinc-300 focus:placeholder:text-zinc-400 outline-none'
							placeholder='Search Truth'
							type='text'
							name='search'
						/>
					</form>
				</div>
			)}
		</>
	)
}

export default Header
