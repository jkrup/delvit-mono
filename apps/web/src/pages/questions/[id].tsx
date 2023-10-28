import QuestionScreen from '@/components/mobile/screens/QuestionScreen'
import BackTitle from '@/components/webview/BackTitle'
import BanterSection from '@/components/webview/BanterSection'
import ConsensusDropdown from '@/components/webview/ConsensusDropdown'
import DeleteIcon from '@/components/webview/DeleteIcon'
import FilterBar from '@/components/webview/FilterBar'
import LoadingArticlePage from '@/components/webview/LoadingArticlePage'
import Page from '@/components/webview/Page'
import { useViewPort } from '@/hooks/useViewPort'
import { timeToReadibleAgo } from '@/utils/helpers'
import { trpc } from '@/utils/trpc'
import {
	ChevronRightIcon,
	DocumentMagnifyingGlassIcon,
	LinkIcon,
	QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import hstkLogoUrl from '../../imgs/hstk-logo.png'

const QuestionPage = () => {
	const router = useRouter()
	const { width } = useViewPort()
	//TODO: Check articleId is string
	const questionId = router.query.id as string
	const question = trpc.useQuery(['question.getQuestion', { id: questionId }])
	const isAdmin = trpc.useQuery(['auth.isAdmin'])
	const userID = trpc.useQuery(['auth.getUserID'])

	const answerSchelling = trpc.useMutation(['question.answerSchelling'])
	const finalizeConsensus = trpc.useMutation(['question.finalizeConsensus'], {
		onSuccess() {
			router.push('/?type=consensus')
		},
	})
	const questionData = question.data
	const schellings = questionData?.Schelling ?? []
	const scheller = schellings.filter((x) => x.state === 'PENDING' && x.userId === userID.data)[0]

	const questionState = questionData?.questionStates?.[0]?.state ?? 'PENDING'
	const consensusInvitations = schellings.filter((x) => x.state === 'INVITED' || x.state === 'PENDING')
	const consensusCompleted = schellings.filter((x) => x.state === 'SUBMITTED')

	const votingMode = !!scheller

	const [step, setStep] = useState(0)
	const [questionOne, setQuestionOne] = useState(true)
	const [questionTwo, setQuestionTwo] = useState(0)
	const [questionFour, setQuestionFour] = useState(true)
	const [promptNext, setPromptNext] = useState(false)

	useEffect(() => {
		if (!scheller) {
			return
		}
		if (scheller?.answer !== null) {
			setStep(0)
			setPromptNext(true)
		}
		if (scheller?.confidence !== null) {
			setStep(1)
			setPromptNext(true)
		}
		if (scheller?.bestPostId !== null) {
			setStep(2)
			setPromptNext(true)
		}
		if (scheller?.personalAnswer !== null) {
			setStep(3)
			setPromptNext(true)
		}
		setQuestionOne(scheller?.answer === null ? true : !!scheller?.answer)
		setQuestionTwo(scheller?.confidence || 0)
		// setQuestionThree(scheller?.bestPostId)
		setQuestionFour(scheller?.personalAnswer === null ? true : !!scheller?.personalAnswer)
	}, [scheller])

	const activeButtonCss = 'bg-gold rounded-md p-4 font-bold text-white grow basis-1/2'
	const inactiveButtonCss = 'border-gold border text-gold rounded-md py-2 font-bold grow basis-1/2'

	if (!router.isReady || question.isLoading || !questionData) {
		return <LoadingArticlePage />
	}

	const forPostsCount = questionData.posts.filter((p) => p.evidenceType === 'FOR').length
	const againstPostsCount = questionData.posts.filter((p) => p.evidenceType === 'AGAINST').length

	const forPercent = questionData.posts.length > 0 ? Math.round((forPostsCount / questionData.posts.length) * 100) : 50
	const forEarn = Math.floor((100 - forPercent) / 10)
	const againstEarn = Math.floor(forPercent / 10)

	const renderStep = () => {
		if (step === 0) {
			return (
				<>
					<p className='text-sm text-justify'>
						Based on all the evidence presented, do you think most people would say yes or no to the question above?
					</p>
					<div className='flex space-x-2'>
						<button
							className={questionOne ? activeButtonCss : inactiveButtonCss}
							onClick={() => {
								setQuestionOne(true)
								setPromptNext(true)
								answerSchelling.mutate({
									question: questionId,
									response: {
										answer: true,
									},
								})
							}}
						>
							YES
						</button>
						<button
							className={questionOne ? inactiveButtonCss : activeButtonCss}
							onClick={() => {
								setQuestionOne(false)
								setPromptNext(true)
								answerSchelling.mutate({
									question: questionId,
									response: {
										answer: false,
									},
								})
							}}
						>
							NO
						</button>
					</div>
					<button
						className={`flex justify-end font-semibold text-stone-500 ${promptNext ? 'animate-bounce' : ''}`}
						disabled={!promptNext}
						onClick={() => {
							if (promptNext) {
								setStep(step + 1)
								setPromptNext(false)
							}
						}}
					>
						<span>Next</span>
						<ChevronRightIcon className='w-6 h-6' />
					</button>
				</>
			)
		}
		if (step === 1) {
			return (
				<>
					<p className='text-sm text-justify'>What is your level of confidence in your decision?</p>
					<div className='flex flex-col space-y-2'>
						<div className='flex justify-between items-center'>
							{Array(5)
								.fill(0)
								.map((_, i) => {
									return (
										<>
											<button
												className={`h-4 w-4 border-2 rounded-full outline outline-gold ${
													i === questionTwo ? 'bg-gold' : ''
												}`}
												onClick={() => {
													setQuestionTwo(i)
													setPromptNext(true)
													answerSchelling.mutate({
														question: questionId,
														response: {
															confidence: i,
														},
													})
												}}
											>
												&nbsp;
											</button>
											{i !== 4 && <div className='grow bg-gold h-1'></div>}
										</>
									)
								})}
						</div>
						<div className='flex space-x-2 justify-between'>
							<div className='text-gold uppercase'>Low</div>
							<div className='text-gold uppercase'>Average</div>
							<div className='text-gold uppercase'>High</div>
						</div>
					</div>
					<button
						className={`flex justify-end font-semibold text-stone-500 ${promptNext ? 'animate-bounce' : ''}`}
						disabled={!promptNext}
						onClick={() => {
							if (promptNext) {
								setStep(step + 1)
								setPromptNext(false)
							}
						}}
					>
						<span>Next</span>
						<ChevronRightIcon className='w-6 h-6' />
					</button>
				</>
			)
		}
		if (step === 2) {
			return (
				<>
					<p className='text-sm text-justify'>Which post was most influential in helping you make your decision?</p>
					<select
						onClick={() => {
							setPromptNext(true)
						}}
						onChange={(e) => {
							setPromptNext(true)
							answerSchelling.mutate({
								question: questionId,
								response: {
									bestPostId: e.target.value,
								},
							})
						}}
						className='p-2 border rounded'
					>
						{/* QuestionThree */}
						{questionData.posts.map((q) => {
							return (
								<option key={q.evidencePostId} value={q.evidencePostId}>
									{q.evidencePost.title}
								</option>
							)
						})}
					</select>
					<button
						className={`flex justify-end font-semibold text-stone-500 ${promptNext ? 'animate-bounce' : ''}`}
						disabled={!promptNext}
						onClick={() => {
							if (promptNext) {
								setStep(step + 1)
								setPromptNext(false)
							}
						}}
					>
						<span>Next</span>
						<ChevronRightIcon className='w-6 h-6' />
					</button>
				</>
			)
		}
		if (step === 3) {
			return (
				<>
					<p className='text-sm text-justify'>
						Based on all the evidence presented, would you personally vote &ldquo;yes&rdquo; or &ldquo;no&rdquo; to the
						question on the left? This is for internal use only and has no bearing on your reward eligibility.
					</p>
					<div className='flex space-x-2'>
						<button
							className={questionFour ? activeButtonCss : inactiveButtonCss}
							onClick={() => {
								setQuestionFour(true)
								setPromptNext(true)
								answerSchelling.mutate({
									question: questionId,
									response: {
										personalAnswer: true,
									},
								})
							}}
						>
							YES
						</button>
						<button
							className={questionFour ? inactiveButtonCss : activeButtonCss}
							onClick={() => {
								setQuestionFour(false)
								setPromptNext(true)
								answerSchelling.mutate({
									question: questionId,
									response: {
										personalAnswer: false,
									},
								})
							}}
						>
							NO
						</button>
					</div>
					<button
						className={`flex justify-end font-semibold text-stone-500 ${promptNext ? 'animate-bounce' : ''}`}
						disabled={!promptNext}
						onClick={() => {
							if (promptNext) {
								setStep(step + 1)
								setPromptNext(false)
							}
						}}
					>
						<span>Next</span>
						<ChevronRightIcon className='w-6 h-6' />
					</button>
				</>
			)
		}
		if (step === 4) {
			return (
				<>
					<p className='text-sm text-justify'>Thank you for participating in the truth consensus algorithm</p>
					<div className='flex space-x-2'>
						<button
							className={activeButtonCss}
							onClick={() => {
								answerSchelling.mutate({
									question: questionId,
									response: {},
									done: true,
								})
								const query = { ...router.query }
								delete query['voting']
								router.push('/')
							}}
						>
							Done
						</button>
					</div>
				</>
			)
		}
	}

	return (
		<>
			{width > 992 ? (
				<Page title={questionData.title}>
					<div className='grid grid-cols-3 gap-4 max-w-screen-xl mx-auto'>
						{!votingMode && (
							<div className='p-2 flex flex-col space-y-2'>
								<BackTitle title='Question' url='/' />
								<div className='bg-zinc-200 rounded-md p-4 flex flex-col'>
									<div className='flex flex-row justify-between'>
										<div className='whitespace-nowrap overflow-ellipsis overflow-clip'>
											Posted by {question.data?.author.name}
										</div>
										{question.data?.id && <DeleteIcon questionId={question.data?.id} />}
									</div>
									<div className='text-xl font-bold my-4'>{questionData.title}</div>

									<div className='p-4 bg-slate-300 rounded-md flex flex-col'>
										<div className='text-green-600'>{forPercent}% FOR</div>
										<div className='bg-gray-200 rounded-xl'>
											<div className={`bg-green-600 rounded-xl h-2`} style={{ width: `${forPercent}%` }}></div>
										</div>
										<div className='flex px-2 justify-between text-gold'>
											<div className='flex items-center justify-center'>{forPostsCount} Posts</div>
											<div className='flex items-center justify-center'>
												<span className='mr-1'>Earn {forEarn}</span>
												<img src={hstkLogoUrl.src} width='32px' height='32px' />
											</div>
										</div>
									</div>

									<div className='p-4 rounded-md flex flex-col'>
										<div className='text-red-700'>{100 - forPercent}% AGAINST</div>
										<div className='bg-gray-200 rounded-xl'>
											<div className={`bg-red-500 rounded-xl h-2`} style={{ width: `${100 - forPercent}%` }}></div>
										</div>
										<div className='flex px-2 justify-between text-gold'>
											<div className='flex items-center justify-center'>{againstPostsCount} Posts</div>
											<div className='flex items-center justify-center'>
												<span className='mr-1'>Earn {againstEarn}</span>
												<img src={hstkLogoUrl.src} width='32px' height='32px' />
											</div>
										</div>
									</div>
								</div>
								<Link href={`/articles/newWithQuestion/?questionId=${questionId}`} legacyBehavior>
									<button className='bg-gold rounded-md p-4 font-bold text-white'>POST YOUR VIEW</button>
								</Link>
								<BanterSection questionId={questionId} />
								{/* <div>Banter...</div> */}
							</div>
						)}

						<div className='flex flex-col space-y-2 col-span-2'>
							<div className='bg-white rounded-md p-2 px-4'>
								<FilterBar />
							</div>
							{isAdmin.data && !finalizeConsensus.isSuccess && questionState === 'ACTIVE' && (
								<div className='bg-white rounded-md p-2 px-4 flex justify-around items-center'>
									<ConsensusDropdown questionId={questionId} />
									<span>Invitations: {consensusInvitations?.length}</span>
									<span>Responses: {consensusCompleted?.length}</span>
									<button
										className='bg-green-600 rounded-md p-3 text-white font-bold text-sm'
										disabled={finalizeConsensus.isLoading}
										onClick={() => {
											finalizeConsensus.mutate({ questionId })
										}}
									>
										Finalize Consensus
									</button>
								</div>
							)}

							<div className='flex flex-col space-y-4'>
								{questionData.posts.map((post) => {
									const p = post.evidencePost
									return (
										<FeedPost
											key={p.id}
											url={p.url || undefined}
											id={p.id}
											questionId={questionId}
											title={p.title}
											body={p.body}
											author={p?.author.name || ''}
											evidenceType={post.evidenceType}
											createdAt={p.createdAt}
											postsCount={0}
											votes={0}
											evidenceBlocksCount={p._count.evidencePosts}
										/>
									)
								})}
							</div>
							{/* <PostsList questionId={questionId} posts={questionData.posts} /> */}
						</div>
						{votingMode && (
							<div className='flex flex-col rounded overflow-hidden'>
								<div className='text-lg p-4 px-8 font-bold bg-stone-800 overflow-hidden text-gold'>
									{questionData.title}
								</div>
								<div className='bg-slate-100 rounded-md flex flex-col py-4 px-6 space-y-4'>
									<div className='flex items-center text-center justify-center space-x-2'>
										<h2 className='text-lg'>Truth Consensus Algorithm</h2>
										<QuestionMarkCircleIcon className='h-6 w-6 text-gold' />
									</div>
									{renderStep()}
									{/* <div>Banter...</div> */}
								</div>
							</div>
						)}
					</div>
				</Page>
			) : (
				<QuestionScreen questionData={questionData} />
			)}
		</>
	)
}

export interface FeedPostProps {
	id: string
	url?: string
	questionId: string
	title: string
	author: string
	createdAt: Date
	postsCount: number
	votes: number
	evidenceType: 'FOR' | 'AGAINST'
	evidenceBlocksCount: number
	body: string
}

const FeedPost: React.FC<FeedPostProps> = ({
	id,
	questionId,
	url,
	title,
	author,
	createdAt,
	evidenceType = 'FOR',
	evidenceBlocksCount = 0,
	body,
}) => {
	const articleUrl = `/articles/${id}?questionId=${questionId}`
	return (
		<div className='bg-white rounded-md p-2 px-4 flex flex-col space-y-2 shadow hover:shadow-lg transition'>
			<div className='flex space-x-8 text-yellow-800 items-center'>
				<div className='flex space-x-2 items-center'>
					<div className={`${evidenceType === 'FOR' ? 'bg-green-600' : 'bg-red-600'} rounded-full h-4 w-4`}></div>
					{/* <div className="font-bold"> */}
					{/*   HSTK/Path */}
					{/* </div> */}
					<div className='text-sm flex'>
						<div>
							Posted by {author} {timeToReadibleAgo(createdAt)} &#x2022;&nbsp;
						</div>
						<div className={`${evidenceType === 'FOR' ? 'text-green-600' : 'text-red-600'} font-bold`}>
							{evidenceType}
						</div>
					</div>
				</div>
				<DeleteIcon postId={id} reload />
			</div>

			{/* Article Title */}
			<Link href={articleUrl} className='text-2xl font-bold mb-6' legacyBehavior>
				{title}
			</Link>

			{/* Post Body */}
			<div className='whitespace-pre-wrap line-clamp-3'>{body}</div>

			{url && (
				<a
					className='pb-4 flex items-center text-gold space-x-1 truncate w-80'
					href={url}
					rel='noreferrer'
					target='_blank'
				>
					<LinkIcon className='h-4 w-4' /> <div className='truncate w-80'>{url}</div>
				</a>
			)}

			{/* Buttons */}
			<div className='flex space-x-16 text-gray-400 font-bold'>
				<Link href={articleUrl} legacyBehavior>
					<button className='flex items-center space-x-1'>
						<DocumentMagnifyingGlassIcon className='h-5 w-5' />
						<div>
							{evidenceBlocksCount === 1
								? `${evidenceBlocksCount} Evidence Block`
								: `${evidenceBlocksCount} Evidence Blocks`}
						</div>
					</button>
				</Link>
			</div>
		</div>
	)
}

export default QuestionPage
