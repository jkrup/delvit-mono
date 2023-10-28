import BottomTab from '@/components/mobile/partials/BottomTab'
import PageHeader from '@/components/mobile/partials/PageHeader'
import Header from '@/components/webview/Header'
import { useViewPort } from '@/hooks/useViewPort'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'

import { trpc } from '../../utils/trpc'

const NewArticlePage = () => {
	const { width } = useViewPort()
	const router = useRouter()
	const submitQuestion = trpc.useMutation(['question.submitQuestion'])
	const topic = (router.query['topic'] as string) || undefined

	useEffect(() => {
		if (submitQuestion.isSuccess) {
			router.push('/?type=pending')
		}
	}, [submitQuestion, router])

	const onSubmit = (e: React.FormEvent) => {
		console.log('ON SUBMIT TRIGGERED')
		e.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement)

		const title = formData.get('title') as string

		submitQuestion.mutate({ title })

		return false
	}

	return (
		<>
			<Head>
				<title>HSTK | Submit Question</title>
			</Head>
			{width > 992 ? (
				<div>
					<Header />
					<div className='bg-slate-300 min-h-screen'>
						<form onSubmit={onSubmit} className='flex flex-col space-y-4 max-w-screen-lg m-auto py-8'>
							<input
								minLength={3}
								name='title'
								required
								placeholder='Question'
								className='rounded-md p-2 placeholder:italic'
							/>
							<button className='bg-yellow-500 text-white rounded-full p-2 uppercase font-bold'>Submit</button>
						</form>
					</div>
				</div>
			) : (
				<>
					<PageHeader goBack={true} title='Add Question' />
					<div className='p-3'>
						<form onSubmit={onSubmit} className='flex flex-col space-y-4 max-w-screen-lg m-auto py-8'>
							<input
								minLength={3}
								name='title'
								required
								placeholder='Question'
								className='rounded-md p-2 placeholder:italic'
							/>
							<button className='bg-gold text-white rounded-lg p-2 uppercase font-bold'>Submit</button>
						</form>
						<BottomTab />
					</div>
				</>
			)}
		</>
	)
}

export default NewArticlePage
