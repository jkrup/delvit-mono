import NewPostScreen from '@/components/mobile/screens/NewPostScreen'
import BackTitle from '@/components/webview/BackTitle'
import Header from '@/components/webview/Header'
import { useViewPort } from '@/hooks/useViewPort'
import { trpc } from '@/utils/trpc'
import { PlusIcon } from '@heroicons/react/24/outline'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const NewArticlePage = () => {
	const { width } = useViewPort()
	const router = useRouter()
	const submitPost = trpc.useMutation(['article.submitPost'])
	const [image, setImage] = useState('')
	const [description, setDescription] = useState('')
	const [title, setTitle] = useState('')
	const [urls, setUrls] = useState<string[]>([''])

	const { questionTitle } = router.query
	const questionId = router.query.questionId as string
	const postId = router.query.postId as string

	const backTitle = trpc.useQuery(['article.getBackTitle', { postId, questionId }])

	console.log(questionTitle)

	useEffect(() => {
		if (submitPost.isSuccess) {
			if (questionId) {
				router.push(`/articles/${submitPost.data.postId}?questionId=${questionId}`)
			} else {
				router.back()
				// router.push("/articles/" + postId);
			}
		}
	}, [submitPost, router, questionId])

	const onSubmit = (e: React.FormEvent) => {
		console.log('ON SUBMIT TRIGGERED')
		e.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement)
		const title = formData.get('title') as string
		const body = formData.get('body') as string
		const url = (formData.getAll('link[]') as string[]).join(',')
		const evidenceType = formData.get('evidenceType') as string

		submitPost.mutate({
			title,
			body,
			url,
			questionId,
			postId,
			for: evidenceType === 'FOR',
		})

		return false
	}

	return (
		<>
			<Head>
				<title>DLV | Submit Article</title>
			</Head>
			{width > 992 ? (
				<div>
					<Header />
					<div className='min-h-screen'>
						<form onSubmit={onSubmit} className='flex flex-col space-y-4 max-w-screen-lg m-auto py-8'>
							{(questionId || postId) && (
								<BackTitle
									title={backTitle.data!}
									url={(questionId && `/questions/${questionId}`) || (postId && `/articles/${postId}`)}
								/>
							)}
							<div>
								<div className='flex items-center justify-center space-x-4 text-lg font-semibold'>
									<legend className='text-yellow-800'>You are posting:</legend>
									<label htmlFor='for' className='flex items-center space-x-2'>
										<input
											type='radio'
											id='for'
											value='FOR'
											name='evidenceType'
											defaultChecked={true}
											className='peer hidden'
										/>
										<div className='h-4 w-4 border-2 outline outline-yellow-800 rounded-full peer-checked:bg-yellow-800'></div>
										<div className='text-green-600 font-semibold'>For</div>
									</label>
									<label htmlFor='against' className='flex items-center space-x-2'>
										<input type='radio' id='against' value='AGAINST' name='evidenceType' className='hidden peer' />
										<div className='h-4 w-4 border-2 outline outline-yellow-800 rounded-full peer-checked:bg-yellow-800'></div>
										<div className='text-red-800 font-semibold'>Against</div>
									</label>
								</div>
							</div>

							<div className='flex justify-evenly flex-wrap space-x-4 my-4'>
								<div className='flex flex-col grow shrink-0'>
									<div className='text-yellow-800'>Title</div>
									<input
										minLength={3}
										name='title'
										required
										placeholder='Title of the Post'
										className='rounded bg-gold bg-opacity-5 p-4'
										defaultValue={title}
									/>
									<div className='text-yellow-800 mt-4'>Link</div>
									{urls.map((url, i) => {
										return (
											<input
												key={i}
												name='link[]'
												type='url'
												placeholder='https://external-link.example'
												className='rounded bg-gold bg-opacity-5 p-4 my-4'
												onBlur={(e) => {
													if (e.target.value && !e.target.validity.valid) {
														if (!e.target.value.match(/^http.?:/)) {
															e.target.value = 'https://' + e.target.value
														}
													}
												}}
											/>
										)
									})}
									<button
										className='flex items-center text-yellow-800 space-x-2 m-2 justify-end'
										type='button'
										onClick={() => {
											setUrls([...urls, ''])
										}}
									>
										<PlusIcon className='h-4 w-4' /> <div>Add</div>
									</button>
								</div>
								<div className='flex flex-col grow shrink-0'>
									<div className='text-yellow-800'>Explaination</div>
									<textarea
										name='body'
										required
										placeholder='Explaination here...'
										className='rounded bg-gold bg-opacity-5 p-4 h-full'
										defaultValue={description}
									/>
								</div>
							</div>
							<div className='flex justify-center space-x-8 font-serif'>
								<button
									className='text-yellow-800 border-yellow-800 border rounded p-2 uppercase font-bold w-32'
									type='button'
									onClick={() => {
										router.push(`/questions/${questionId}`)
									}}
								>
									Discard
								</button>
								<button className='bg-yellow-800 text-white rounded p-2 uppercase font-bold w-32'>Post</button>
							</div>
						</form>
					</div>
				</div>
			) : (
				<NewPostScreen
					submitPost={submitPost}
					questionTitle={backTitle.data}
					title={title}
					setTitle={setTitle}
					postId={postId}
					questionId={questionId}
					description={description}
					urls={urls}
					setUrls={setUrls}
				/>
			)}
		</>
	)
}

export default NewArticlePage
