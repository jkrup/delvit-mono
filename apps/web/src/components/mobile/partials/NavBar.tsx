import Menu from '@/components/icons/Menu'
import Wallet from '@/components/icons/Wallet'
import { useStore } from '@/hooks/useStore'
import { prettyPrintInt } from '@/utils/helpers'
import { trpc } from '@/utils/trpc'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'

const NavBar = () => {
	const [isOpen, toggleSideBar] = useStore((state) => [state.isSideBarOpen, state.toggleSideBar])
	const { status } = useSession()
	const router = useRouter()
	const avatarData = trpc.useQuery(['auth.getAvatar'])
	const profile = trpc.useQuery(['auth.getProfile'])
	const avatar = avatarData.data || '/noavatar.png'
	

	if (status === 'unauthenticated') {
		router.replace('/login')
	}
	return (
		<div className='p-2 py-4 fixed top-0 z-10 w-full bg-white flex items-center justify-between'>
			<div onClick={() => toggleSideBar(true)}>
				<Menu />
			</div>
			{/* <div className='relative'>
				<Wallet width={35} height={28} />
				<span className='text-xs text-green-600 font-bold'>+{prettyPrintInt(points)}</span>
			</div> */}
		</div>
	)
}

export default NavBar
