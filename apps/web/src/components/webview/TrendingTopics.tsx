import { trpc } from '@/utils/trpc'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useState } from 'react'

const TrendingTopics = () => {
	const [limit, setLimit] = useState(5)
	const [search, setSearch] = useState('')

	const popularTopics = trpc.useQuery(['topic.getPopularTopics'])
	const viewAll = limit >= (popularTopics.data?.length || 1)

	// get activeTopic from router
	const router = useRouter()
	const activeTopic = router.query.topic as string | undefined

	//TODO: loading state

	const popTopics = popularTopics.data
	return (
		<div className='flex flex-col rounded bg-white overflow-hidden'>
			<div className='title pt-4 text-center text-yellow-900 text-xl border-b-2 pb-4 border-gold'>
				Trending Tags
			</div>
			<div className='flex flex-col justify-center p-4 space-y-4'>
				<div className='rounded text-center flex items-center px-2 mx-1 bg-neutral-100'>
					<MagnifyingGlassIcon className='h-6 w-6 text-stone-500' />
					<input
						className='w-full p-2 outline-0 bg-neutral-100'
						type='text'
						placeholder='Search Topic'
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<div className='flex flex-wrap'>
					{popTopics
						?.filter((topic) => topic.title.toLowerCase().startsWith(search.toLowerCase()))
						.map(
							(topic, i) =>
								i < limit && (
									<div key={topic.id} className='grow basis-1/2 flex'>
										<button
											onClick={() => {
												if (activeTopic === topic.id) {
													delete router.query['topic']
												} else {
													router.query.topic = topic.id
												}
												router.push({ query: router.query })
											}}
											className={`m-1 py-2 px-4 text-lg  whitespace-nowrap  rounded hover:bg-stone-200 hover:text-yellow-800 bg-gold bg-opacity-5 grow border border-2 text-gold ${
												activeTopic === topic.id ? 'border-gold font-bold' : 'border-transparent font-medium'
											}`}
										>
											{topic.title}
										</button>
									</div>
								),
						)}
				</div>
				{!viewAll && (
					<div className='text-center p-2'>
						<button
							onClick={() => {
								setLimit(Infinity)
							}}
							className='w-full py-2 px-4 text-lg whitespace-nowrap rounded hover:bg-stone-200 bg-gold bg-opacity-5 grow border-yellow-800 text-yellow-800'
						>
							View all
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default TrendingTopics
