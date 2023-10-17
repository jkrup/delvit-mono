import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import { useStringState } from '@delvit/web/utils/helpers'
import { trpc } from '@delvit/web/utils/trpc'

import DropDown from './DropDown'

interface ConsensusDropdownProps {
	questionId: string
}

const ConsensusDropdown: React.FC<ConsensusDropdownProps> = ({ questionId }) => {
	const userID = useStringState(null)
	const users = trpc.useQuery(['question.getActiveUsers', { questionId }])

	const createSchelling = trpc.useMutation(['question.createSchelling'], {
		onSuccess() {
			window.location.reload()
		},
	})

	const disabled = createSchelling.isLoading || createSchelling.isSuccess || !userID.val

	return (
		<>
			<button
				className={`bg-green-600 rounded-md p-3 text-white font-bold text-sm ${disabled && 'opacity-20'}`}
				disabled={disabled}
				onClick={(e) => {
					if (userID.val) createSchelling.mutate({ questionId, userId: userID.val })
				}}
			>
				Invite
			</button>
			<div className='w-64'>
				<DropDown
					className={`w-64`}
					onSelect={(event) => {
						userID.set(event.currentTarget.value)
					}}
				>
					<option>Select user</option>
					{users.data
						?.filter((user) => !user.Schelling.length)
						.map((user) => (
							<option key={user.id} value={user.id} className='overflow-hidden text-ellipsis whitespace-nowrap'>
								{user.name}
							</option>
						))}
				</DropDown>
			</div>
		</>
	)
}

export default ConsensusDropdown
