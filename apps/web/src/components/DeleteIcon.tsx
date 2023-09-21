import React from 'react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { trpc } from '@delvit/web/utils/trpc'

type Props = {
	reload?: boolean
} & (
	| {
			postId: string
	  }
	| {
			questionId: string
	  }
)

const DeleteIcon: React.FC<Props> = ({ reload, ...rest }) => {
	const router = useRouter()
	const removeQ = trpc.useMutation(['article.removeQuestion'])
	const removeP = trpc.useMutation(['article.removePost'])

	return (
		<XMarkIcon
			className='text-red-400 w-6 h-6 cursor-pointer hover:text-red-600'
			onClick={async () => {
				if ('postId' in rest) {
					await removeP.mutateAsync(rest)
				} else if ('questionId' in rest) {
					await removeQ.mutateAsync(rest)
				}
				if (reload) router.reload()
        else router.replace('/')
			}}
		/>
	)
}

export default DeleteIcon
