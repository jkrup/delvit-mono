import { TrophyIcon, LightBulbIcon, RssIcon } from '@heroicons/react/24/outline'
import { FireIcon, ArrowTrendingUpIcon,  BoltIcon, FunnelIcon} from '@heroicons/react/20/solid'
import { } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'

const FilterBar = () => {
	const router = useRouter()

	const queryMode = router.query['order'] as string
	const ENABLED_MODES = ['NEW', 'TOP'] as const

	const mode = ENABLED_MODES.includes(queryMode as 'NEW' | 'TOP') ? (queryMode as 'NEW' | 'TOP') : 'NEW'

	return (
		<div className='flex justify-between overflow-x-auto'>
			<div className='flex space-x-4'>
				<button
					className={'flex items-center ' + (mode === 'NEW' ? 'font-bold text-stone-800' : 'text-stone-500')}
					onClick={() => {
						delete router.query['order']
						router.push({ query: { ...router.query } })
					}}
				>
					<RssIcon className='h-5 w-5 mr-1' />
					<span>New</span>
				</button>
				<button
					className={'flex items-center' + (mode === 'TOP' ? ' font-bold text-stone-800 ' : ' text-stone-500')}
					onClick={() => {
						router.query['order'] = 'TOP'
						router.push({ query: { ...router.query } })
					}}
				>
					<TrophyIcon className='h-5 w-5 mr-1' />
					<span>Top</span>
				</button>
				<button disabled className='flex items-center text-stone-200 disabled:cursor-not-allowed'>
					<ArrowTrendingUpIcon className='h-5 w-5 mr-1' />
					<span>Trending</span>
				</button>
				<button disabled className='flex items-center text-stone-200 disabled:cursor-not-allowed'>
					<FireIcon className='h-5 w-5 mr-1' />
					<span>Controversial</span>
				</button>
				<button disabled className='flex items-center text-stone-200 disabled:cursor-not-allowed'>
					<BoltIcon className='h-5 w-5 mr-1' />
					<span>Earn</span>
				</button>
			</div>
			<div className='flex items-end space-x-1 text-stone-200 cursor-not-allowed'>
				<FunnelIcon className='h-6 w-6 mr-1' />
				<div className='px-8 border rounded'>All</div>
			</div>
		</div>
	)
}

export default FilterBar
