import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import Page from '@delvit/web/components/Page'
import { trpc } from '@delvit/web/utils/trpc'

const NewTopicPage = () => {
	const router = useRouter()
	const createTopic = trpc.useMutation(['topic.createTopic'])

	// Auth check
	useEffect(() => {
		if (createTopic.isSuccess) {
			router.push('/topics/')

			// router.push({
			// 	pathname: '/',
			// 	query: {
			// 		topic: createTopic.data.id,
			// 	},
			// })
		}
	}, [createTopic, router])

	const onSubmit = (e: React.FormEvent) => {
		console.log('ON SUBMIT TRIGGERED')
		e.preventDefault()

		const formData = new FormData(e.target as HTMLFormElement)
		const title = formData.get('title') as string
		// const body = formData.get('body') as string;

		createTopic.mutate({ title })

		return false
	}

	return (
		<Page title='New Tag'>
			<form onSubmit={onSubmit} className='flex flex-col space-y-4 max-w-screen-lg m-auto py-8'>
				<input minLength={3} name='title' required placeholder='Title' className='rounded-md p-2 placeholder:italic' />
				<button className='bg-green-400 text-white rounded-full p-2 uppercase font-bold'>Submit</button>
			</form>
		</Page>
	)
}

export default NewTopicPage
