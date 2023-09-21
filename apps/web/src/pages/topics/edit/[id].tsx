//@ts-nocheck
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { XIcon } from '@heroicons/react/24/outline'
import Page from '@delvit/web/components/Page'
import { trpc } from '@delvit/web/utils/trpc'

const EditTopicPage = () => {
	const router = useRouter()

	const editTopic = trpc.useMutation(['article.editTopic'])

	const topicId = router.query.id as string
	const topic = trpc.useQuery(['article.getTopic', { topicId }], {
		enabled: router.isReady,
	})

	const [relatedArticles, setRelatedArticles] = useState(topic.data?.relatedArticles || [])
	const newRelatedArticleRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		setRelatedArticles(topic.data?.relatedArticles || [])
	}, [topic.data])

	if (!topic.data) {
		// TODO: loading
		return null
	}

	const { title, body } = topic.data

	const addArticle: React.MouseEventHandler = async (_e) => {
		const newRelatedArticleUrlOrId = newRelatedArticleRef?.current?.value || ''
		const splits = newRelatedArticleUrlOrId.split('/')
		const newRelatedArticleId = splits[splits.length - 1]
		if (!newRelatedArticleId) {
			return
		}

		const q = await trpcRaw.query('article.getArticle', {
			json: {
				articleId: newRelatedArticleId,
			},
		})

		newRelatedArticleRef.current!.value = ''

		setRelatedArticles((o) => [
			...o,
			{
				id: q.json.id,
				title: q.json.title,
			},
		])
	}

	const removeRelatedArticle = (relatedArticleId: string) => {
		const relatedArticleIds = relatedArticles.filter(({ id }) => id !== relatedArticleId).map(({ id }) => id)
		editTopic.mutate({ id: topicId, title, body, relatedArticleIds })
	}

	const onSubmit = (e: React.FormEvent) => {
		console.log('ON SUBMIT TRIGGERED')
		e.preventDefault()

		const formData = new FormData(e.target as HTMLFormElement)
		const title = formData.get('title') as string
		const body = formData.get('body') as string
		const relatedArticleIds = relatedArticles.map(({ id }) => id)
		console.log({ relatedArticleIds })

		editTopic.mutateAsync({ id: topicId, title, body, relatedArticleIds }).then(() => {
			router.push('/topics/' + topicId)
		})

		return false
	}

	return (
        <Page title='Edit Topic'>
			<div className='bg-slate-300 min-h-screen'>
				<form onSubmit={onSubmit} className='flex flex-col space-y-4 max-w-screen-lg m-auto py-8'>
					<input
						minLength={3}
						name='title'
						required
						placeholder='Title'
						className='rounded-md p-2 placeholder:italic'
						defaultValue={title}
					/>
					<textarea
						name='body'
						required
						placeholder='Article Body'
						className='rounded-md p-2 h-80'
						defaultValue={body}
					/>
					<fieldset className='bg-gray-200 p-2 my-8 rounded-xl'>
						<div className='font-bold'>Related Articles</div>
						<div className='flex flex-col'>
							<ol className=''>
								{relatedArticles?.map((relatedArticle) => {
									return (
                                        <li
											key={relatedArticle.id}
											className='my-2 w-full flex justify-between items-center hover:bg-yellow-500'
										>
											<Link href={'/articles/' + relatedArticle.id} legacyBehavior>{relatedArticle.title}</Link>
											<XIcon
												onClick={() => {
													removeRelatedArticle(relatedArticle.id)
												}}
												className='h-4 w-4'
											/>
										</li>
                                    );
								})}
							</ol>
							<div className='flex'>
								<input type='text' className='rounded-md w-full' ref={newRelatedArticleRef}></input>
								<button type='button' className='rounded-md bg-blue-400 ml-4 p-2 px-6' onClick={addArticle}>
									Add
								</button>
							</div>
						</div>
					</fieldset>
					<button className='bg-yellow-500 text-white rounded-full p-2 uppercase font-bold'>Submit</button>
				</form>
			</div>
		</Page>
    );
}

export default EditTopicPage
