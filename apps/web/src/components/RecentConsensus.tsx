import Link from 'next/link'
import { useState } from 'react'

import { trpc } from '../utils/trpc'

const RecentConsensus = () => {
	const consensusItems = trpc.useQuery(['question.getRecentConsensus'])
	const [limit, setLimit] = useState(3)
	const viewAll = limit >= (consensusItems.data?.length || 1)

	return (
		<div className='flex flex-col rounded bg-white overflow-hidden'>
			<div className='title pt-4 text-center text-yellow-900 text-xl border-b-2 pb-4 border-yellow-600'>
				Recent Consensus
			</div>
			<div className='flex flex-col justify-center space-y-4'>
				<div className='flex flex-wrap'>
					{consensusItems?.data?.map(
						(consensusQuestion, i) =>
							i < limit && (
								<Link
									key={consensusQuestion.id}
									href={`/consensus/${consensusQuestion.id}`}
									className='px-4 hover:bg-stone-300 hover:text-yellow-800 grow'
								>
									<div key={consensusQuestion.id} className='flex p-4 items-center space-x-4'>
										<div className='text-xl font-bold'>{i + 1}</div>
										<div className='m-1 text-lg rounded grow border-yellow-800'>{consensusQuestion.title}</div>
									</div>
								</Link>
							)
					)}
					{!consensusItems.data?.length && <div className='p-2'></div>}
				</div>
				{!viewAll && (
					<div className='text-center py-4 px-6'>
						<button
							onClick={() => {
								setLimit(Infinity)
							}}
							className='w-full py-2 px-4 text-lg whitespace-nowrap rounded hover:bg-stone-200 bg-stone-100 grow border-yellow-800 text-yellow-800'
						>
							View all
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default RecentConsensus
