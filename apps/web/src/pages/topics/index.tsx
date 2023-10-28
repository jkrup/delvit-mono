import { PlusIcon } from '@heroicons/react/20/solid'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import Page from '@/components/Page'
import { trpc } from '@/utils/trpc'

const TopicListPage = () => {
	const router = useRouter()
	const topics = trpc.useQuery(['topic.list'])
	const removeTopic = trpc.useMutation(['topic.removeTopic'])

	return (
		<Page title='Tags'>
			<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
				<table className='w-full text-sm text-left text-neutral-500 '>
					<thead className='text-xs text-neutral-700 uppercase bg-neutral-50  '>
						<tr>
							<th scope='col' className='px-6 py-3'>
								Tag
							</th>
							<th scope='col' className='px-6 py-3'>
								<span className='sr-only'>Edit</span>
								<Link href={`/topics/new`} legacyBehavior>
									<button className='bg-green-400 hover:bg-green-500 p-2 rounded-md text-white align-middle'>
										<PlusIcon className='w-6 h-6 inline' />
										New Tag
									</button>
								</Link>
							</th>
						</tr>
					</thead>
					<tbody>
						{topics.data?.map((tag) => (
							<tr key={tag.id} className='bg-white border-b  hover:bg-neutral-50 -600'>
								<th scope='row' className='px-6 py-4 font-medium text-neutral-900 whitespace-nowrap'>
									{tag.title}
								</th>
								<td className='px-6 py-4 text-right'>
									<button
										disabled={removeTopic.isLoading}
										onClick={async () => {
											await removeTopic.mutateAsync({ topicId: tag.id })
											await topics.refetch()
										}}
										className='font-medium text-red-600  hover:underline'
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Page>
	)
}

export default TopicListPage
