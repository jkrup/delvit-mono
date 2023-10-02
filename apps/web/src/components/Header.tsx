import hstkLogoUrl from '../imgs/hstk-logo.png'
import Link from 'next/link'
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import UserMenu from './UserMenu'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Image from 'next/image'

const Header = () => {
	const { status } = useSession()
	const router = useRouter()

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
        <div className='h-24 bg-white p-4'>
			<div className='flex flex-row justify-between items-center max-w-screen-xl mx-auto'>
				<Link href='/'>

                    <Bars3Icon className='w-10 relative' />

                </Link>
				<form
					className='grow my-auto flex-wrap space-x-4 mx-8 justify-center max-w-screen-xl hidden sm:flex lg:mx-32'
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
    );
}

export default Header