import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

import { trpc } from '@delvit/web/utils/trpc'

import FeedPendingQuestion from './FeedPendingQuestion'
import FilterBar from './FilterBar'
import InfoSection from './InfoSection'
import SearchDisplay from './SearchDisplay'

const SelectedAlert = () => {
	return (
		<div className='flex bg-yellow-600 px-8 py-4 items-center'>
			<div className='text-white italic font-semibold'>
				Alert - you have been randomly selected to participate in the truth Consensus Algorithm
			</div>
			<div className='shrink-0'>
				<Link href='/about' className='underline italic'>
					click here for info
				</Link>
			</div>
		</div>
	)
}

const PendingFeed = () => {
	const router = useRouter()
	const topic = router.query['topic'] as string | undefined
	const queryMode = router.query['order'] as string
	const query = router.query['q'] as string
	const ENABLED_MODES = ['NEW', 'TOP'] as const

	// TODO read from DB
	const selected = useRef(false)

	const mode = ENABLED_MODES.includes(queryMode as 'NEW' | 'TOP') ? (queryMode as 'NEW' | 'TOP') : 'NEW'

	const allPendingQuestions = trpc.useQuery(['question.getAllPendingQuestions', { mode, topic, query }])
	const isAdmin = trpc.useQuery(['auth.isAdmin'])
	const schellingQuestions = trpc.useQuery(['question.getSchellingQuestions'])
	const activateQuestion = trpc.useMutation(['question.activateQuestion'])

	useEffect(() => {
		if (
			schellingQuestions.data?.some((sq) => {
				return sq.Schelling[0]?.state === 'INVITED'
			})
		) {
			selected.current = true
		} else {
			selected.current = false
		}
	}, [schellingQuestions?.data])

	const pendingQuestions = allPendingQuestions.data

	if (allPendingQuestions.isLoading || !allPendingQuestions.data) {
		return (
			<div className='col-span-2 flex flex-col space-y-4'>
				<div className='bg-slate-200 rounded-md p-3 px-4 animate-pulse'>&nbsp;</div>

				{Array(10)
					.fill(0)
					.map((_, i) => {
						return (
							<div key={i} className='bg-slate-200 rounded-md h-40 animate-pulse'>
								{' '}
							</div>
						)
					})}
			</div>
		)
	}

	return (
		<div className='flex flex-col space-y-4'>
			<div>
				<InfoSection
					title='PENDING'
					body='Questions below have been recently submitted and are pending review and approval before they can go live.'
				/>
				{selected.current && <SelectedAlert />}
			</div>
			<br />
			<SearchDisplay />
			<FilterBar />
			<div>
				{pendingQuestions?.map((pendingQuestion) => {
					const url = `/questions/${pendingQuestion.id}`
					return (
						<FeedPendingQuestion
							id={pendingQuestion.id}
							key={pendingQuestion.id}
							url={url}
							author={pendingQuestion.author}
							votes={pendingQuestion.votes}
							title={pendingQuestion.title}
							opinion={pendingQuestion.opinion ?? undefined}
							refetch={allPendingQuestions.refetch}
							comments={pendingQuestion.comments}
							isAdmin={isAdmin.data}
							activate={async () => {
								await activateQuestion.mutateAsync({
									questionId: pendingQuestion.id,
								})
								await allPendingQuestions.refetch()
							}}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default PendingFeed
