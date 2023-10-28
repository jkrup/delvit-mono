import { XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'

const SearchDisplay = () => {
	const router = useRouter()
	const query = router.query['q'] as string | undefined

	if (!query) {
		return null
	}

	return (
		<div className='flex'>
			<div className='font-semibold mr-2'>Search results for: </div>
			<div className='italic'>{query}</div>
			<button
				className='flex'
				onClick={() => {
					delete router.query['q']
					router.push({
						query: router.query,
					})
				}}
			>
				<XMarkIcon className='h-4 w-4' />
			</button>
		</div>
	)
}

export default SearchDisplay