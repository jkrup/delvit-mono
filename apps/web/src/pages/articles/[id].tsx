import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import Article from '@/components/Article'
import BackTitle from '@/components/BackTitle'
import DropDown from '@/components/DropDown'
import Evidence from '@/components/Evidence'
import EvidenceArticle from '@/components/EvidenceArticle'
import LoadingArticlePage from '@/components/LoadingArticlePage'
import Page from '@/components/Page'

import Header from '../../components/Header'
import { trpc } from '../../utils/trpc'

const ArticlePage = () => {
	const router = useRouter()

	//TODO: Check articleId is string
	const articleId = router.query.id as string
	const questionId = router.query.questionId as string
	const postId = router.query.postId as string

	const backTitle = trpc.useQuery(['article.getBackTitle', { postId, questionId }])

	const [evidenceView, setEvidenceView] = useState('FOR')

	const viewArticle = trpc.useMutation(['article.viewArticle'])

	const article = trpc.useQuery(['article.getArticle', { articleId }], {
		enabled: router.isReady,
	})
	console.log({ article })

	const articleComentVotes = trpc.useQuery(['article.getArticleCommentVotes', { articleId }])

	useEffect(() => {
		if (articleId) {
			// Increment VIEW on Article
			// remove this from mutate for viewArticle.mutate in hooks dependency
			viewArticle.mutate.call(undefined, { articleId })
		}
	}, [articleId, viewArticle.mutate])

	useEffect(() => {
		if (article.isRefetching) {
			articleComentVotes.refetch()
		}
	})

	const commentToVotes = new Map()
	articleComentVotes.data?.forEach((commentVote: any) => {
		commentToVotes.set(commentVote.commentId, commentVote.vote)
	})

	if (!router.isReady || article.isLoading || !article.data) {
		return <LoadingArticlePage />
	}

	const { data: articleData } = article

	const renderTopSupporting = () => {
		const article = articleData.evidencePosts.find((e) => e.evidenceType == 'FOR')
		if (!article) {
			return null
		}
		return (
			<Evidence
				id={article.evidencePostId}
				stance={true}
				title={article.evidencePost.title}
				evidenceLink={article.evidencePost.url}
			>
				{article.evidencePost.body}
			</Evidence>
		)
	}

	const renderTopOpposing = () => {
		const article = articleData.evidencePosts.find((e) => e.evidenceType == 'AGAINST')
		// console.log("====");
		// console.log(article);
		// console.log("====");
		if (!article) {
			return null
		}
		return (
			<Evidence
				id={article.evidencePostId}
				stance={false}
				title={article.evidencePost.title}
				evidenceLink={article.evidencePost.url}
			>
				{article.evidencePost.body}
			</Evidence>
		)
	}

	return (
		<Page title={articleData.title}>
			<div className='grid grid-cols-5 gap-4 max-w-screen-xl mx-auto'>
				<div className='flex flex-col col-span-3 space-y-4'>
					{backTitle.data && (
						<BackTitle url={(questionId && `/questions/${questionId}`) || undefined} title={backTitle.data} />
					)}
					{/* Article SubSection */}
					<Article
						id={articleData.id}
						imgSrc={article.data.imgSrc || undefined}
						body={articleData.body}
						url={articleData.url || undefined}
						title={articleData.title}
						postedAt={articleData.createdAt.toDateString()}
						postedByName={articleData.author.name as string}
						avatar={articleData.author.image || undefined}
						tags={articleData.topics.map((t) => t.topic)}
					/>
				</div>

				{/* Right SubSection */}
				<div className='flex flex-col col-span-2 space-y-2'>
					{' '}
					{/* Col 2 */}
					<div className='flex flex-col rounded-md'>
						{' '}
						{/* Col 2 */}
						<div className='bg-white rounded-md mb-4 overflow-hidden'>
							<div className='p-4 bg-gold font-bold text-center text-white flex justify-between items-center'>
								<div className='font-serif text-xl px-4'>Evidence Blocks</div>
								<Link
									href={`/articles/newWithQuestion?postId=${articleId}`}
									className='border rounded p-2 px-4 font-serif'
								>
									POST
								</Link>
							</div>
							<div className='rounded-md flex flex-col'>
								<div>
									<div className='grid grid-cols-2 gap-2 m-4'>
										{renderTopSupporting()}
										{renderTopOpposing()}
									</div>
									<div className='flex justify-end mx-4'>
										<div className='flex justify-start'>
											<div
												className={`rounded-full px-[5%] p-1 mr-[5%] font-serif ${
													evidenceView === 'FOR' ? 'bg-green-200' : 'bg-red-200'
												}`}
											>
												<DropDown onSelect={(e) => setEvidenceView(e.target.value)}>
													<option value='FOR'>FOR</option>
													<option value='AGAINST'>AGAINST</option>
												</DropDown>
											</div>
										</div>
									</div>
									<div className='block m-4'>
										{/* <SubmitEvidenceArticle */}
										{/*   articleId={articleData.id} */}
										{/*   refetch={article.refetch} */}
										{/* /> */}
										{articleData.evidencePosts
											.filter((evidencePostData) => evidencePostData.evidenceType === evidenceView)
											.map((evidencePostData) => (
												<EvidenceArticle
													key={evidencePostData.evidencePostId}
													id={evidencePostData.evidencePostId}
													title={evidencePostData.evidencePost.title}
													views={evidencePostData.evidencePost.views}
													commentCount={evidencePostData.evidencePost._count.comments}
													body={evidencePostData.evidencePost.body}
													evidenceType={evidencePostData.evidenceType}
													// imgSrc={evidencePostData.evidenceArticle.imgSrc ?? undefined}
													url={evidencePostData.evidencePost.url ?? undefined}
													evidenceArticleCount={evidencePostData.evidencePost._count.parentPosts}
												/>
											))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Page>
	)
}

export default ArticlePage
