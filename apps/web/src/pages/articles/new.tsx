import BackTitle from '@delvit/web/components/BackTitle'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useMemo } from 'react'
import Header from '../../components/Header'
import { trpc } from '../../utils/trpc'
import Page from '@delvit/web/components/Page'
import { useBoolState, wrapPreventDefault, wrapStopPropagation } from '@delvit/web/utils/helpers'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { orderBy } from 'lodash'

const NewArticlePage = () => {
	const router = useRouter()
	const submitPost = trpc.useMutation(['article.submitPost'])
	const topics = trpc.useQuery(['topic.list'])
	const [image, setImage] = useState('')
	const [description, setDescription] = useState('')
	const [title, setTitle] = useState('')
	const [topicSearch, setTopicSearch] = useState('')
	const [postTopics, setPostTopics] = useState<NonNullable<typeof topics.data>>([])
	const [fetchedUrl, setFetchedUrl] = useState(undefined)

	const topicSearchHasFocus = useBoolState()

	useEffect(() => {
		if (submitPost.isSuccess) {
			router.push('/articles/' + submitPost.data.postId)
		}
	}, [submitPost, router])

	const onSubmit = (e: React.FormEvent) => {
		console.log('ON SUBMIT TRIGGERED')
		e.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement)
		const title = formData.get('title') as string
		const body = formData.get('body') as string
		const url = fetchedUrl || (formData.get('link') as string) || undefined
		const evidenceType = formData.get('evidenceType') as string

		const metadata =
			image && description && title
				? {
						image,
						description,
						title,
				  }
				: undefined
		console.log({ url, metadata })

		submitPost.mutate({
			title,
			body,
			url,
			for: evidenceType === 'FOR',
			image,
			tags: postTopics.map(t => t.id)
		})

		return false
	}

	const fetchMetadataForUrl = (e: React.FocusEvent) => {
		const linkInputDOM = e.target as HTMLInputElement
		const val = linkInputDOM.value.trim()
		linkInputDOM.value = val

		if (linkInputDOM.value && !linkInputDOM.validity.valid) {
			if (!linkInputDOM.value.match(/^http.?:/)) {
				linkInputDOM.value = 'https://' + linkInputDOM.value
			}
		}

		if (linkInputDOM.value && linkInputDOM.validity.valid) {
			const linkPreviewUrl = 'https://api.linkpreview.net/'
			fetch(linkPreviewUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					key: 'ebc0b87b067638b1f9a783836cbabbbd',
					q: linkInputDOM.value,
				}),
			})
				.then((r) => r.json())
				.then((r) => {
					const { description, image, title, url } = r
					setImage(image)
					setDescription(description)
					setTitle(title)
					setFetchedUrl(url)
				})
		}
	}

	const filteredTags = useMemo(() => {
		const selectedIDs = new Set(postTopics.map((t) => t.id))
		return orderBy(
			topics.data
				?.filter((topic) => topicSearch === '' || topic.title.toLowerCase().includes(topicSearch.toLowerCase()))
				.filter((topic) => !selectedIDs.has(topic.id)) ?? [],
				x => x.title.toLowerCase(),
				'asc'
		)
	}, [topics.data, postTopics, topicSearch])

	return (
		<Page
			title='Create Post'
			onClick={topicSearchHasFocus.setFalse}
		>
			<div className='flex flex-col max-w-screen-md m-auto'>
				<div className='text-center text-yellow-600 text-3xl font-semibold'>Create Post</div>
				<form onSubmit={onSubmit} className='flex flex-col space-y-4'>
					<div className='flex flex-col'>
						<label className='text-neutral-700 text-l mb-2'>Post Title</label>
						<input
							minLength={3}
							name='title'
							required
							placeholder='Title'
							className='rounded-lg p-4 placeholder:italic'
							defaultValue={title}
						/>
					</div>
					<div className='flex flex-col'>
						<label className='text-neutral-700 text-l mb-2'>External Link</label>
						{image ? (
							<div className='bg-white p-4 rounded-lg text-center m-auto'>
								<img
									src={image}
									onError={() => {
										setImage('')
									}}
								/>
							</div>
						) : (
							<input
								name='link'
								type='url'
								placeholder='https://'
								className='rounded-lg p-4 placeholder:italic'
								onBlur={fetchMetadataForUrl}
							/>
						)}
					</div>

					<div className='flex flex-col'>
						<label className='text-neutral-700 text-l mb-2'>Tags</label>
						<div className='bg-white rounded-lg relative'>
							<div className={`flex flex-row flex-wrap gap-2 ${postTopics.length && 'p-4'}`}>
								{postTopics.map((topic) => (
									<div
										key={topic.id}
										className='px-4 py-2 bg-yellow-600 bg-opacity-10 rounded-lg text-center justify-center align-center text-yellow-600 select-none'
									>
										<span>
											{topic.title} <XMarkIcon className='w-4 h-4 inline cursor-pointer' onClick={() => {
												setPostTopics(topics => topics.filter(t => t.id !== topic.id))
											}}/>
										</span>
									</div>
								))}
							</div>
							<input
								name='topicSearch'
								type='text'
								placeholder='Search Tags'
								value={topicSearch}
								onChange={(e) => setTopicSearch(e.target.value)}
								className='p-4 placeholder:italic  w-full outline-0'
								onClick={wrapStopPropagation(topicSearchHasFocus.setTrue)}
							/>

							<div
								className={`absolute left-0 w-full z-[1] flex-col bg-white divide-y divide-slate-200 drop-shadow-md max-h-[320px] overflow-y-auto ${
									(topicSearch !== '' || topicSearchHasFocus.val ) ? 'flex' : 'hidden'
								}`}
							>
								{filteredTags.map((topic, idx) => (
									<div
										key={topic.id}
										tabIndex={idx}
										className='p-4 hover:bg-neutral-100 cursor-pointer'
										onClick={wrapStopPropagation(() => {
											setPostTopics((topics) => [...topics, topic])
											setTopicSearch('')
										})}
									>
										{topic.title}
									</div>
								))}
								{filteredTags.length ==
									0 && <div className='p-4 text-neutral-400'>No Results...</div>}
							</div>

							{/* <select
										name='link'
										placeholder='search'
										className='rounded-lg p-4 bg-white outline-none placeholder:italic w-full'
									>
										<option>Search tags</option>
										<option value={'blockchain'}>blockchain</option>
									</select> */}
						</div>
					</div>

					<div className='flex flex-col'>
						<label className='text-neutral-700 text-l mb-2'>Explanation</label>
						<textarea
							name='body'
							required
							placeholder='Explanation here...'
							className='rounded-lg p-4 h-80 placeholder:italic'
							defaultValue={description}
						/>
					</div>
					<div className='text-center flex justify-center'>
						<button className='border border-yellow-600 rounded-lg text-yellow-600 text-2xl uppercase w-64 h-16 mr-8'>
							Discard
						</button>
						<button className='bg-yellow-600 rounded-lg text-white text-2xl uppercase font-bold w-64 h-16'>Post</button>
					</div>
				</form>
			</div>
		</Page>
	)
}

export default NewArticlePage
