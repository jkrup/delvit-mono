import { SchellingState } from '@prisma/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { trpc } from '@delvit/web/utils/trpc'

import Header from '../components/Header'

const SchellingPage: NextPage = () => {
	const [step, setStep] = useState(0)
	const questionResult = trpc.useQuery(['question.getSchellingQuestions'])
	const acceptSchelling = trpc.useMutation(['question.acceptSchelling'])

	const questions = questionResult.data
	const question = questions?.[0]

	useEffect(() => {
		console.log(question)
		if (question?.Schelling?.[0]?.state === SchellingState.PENDING) {
			setStep(1)
		}
	}, [question])

	console.log({ question })

	// const question = {
	//   title: "Does Joe Biden Have Dementia?",
	//   id: "xxxxxxx",
	// };
	const StepOne = (
		<>
			<h2 className='text-white text-lg'>Do you wish to participate?</h2>
			<p className='text-yellow-600 my-4 italic'>
				By agreeing to participate, you agree to stake 100 DLV.
				<br />
				You have 24 hours to respond
			</p>
			<div className='flex justify-center space-x-4 font-semibold text-white my-4'>
				<button className='rounded-lg border-yellow-600 border p-2 w-32 text-yellow-600 hover:bg-amber-200'>
					DECLINE
				</button>
				<button
					onClick={() => {
						acceptSchelling.mutate({ question: question!.id })
						setStep(1)
					}}
					className='bg-yellow-600 rounded-lg p-2 w-32 hover:bg-amber-200'
				>
					AGREE
				</button>
			</div>
		</>
	)

	const StepTwo = question && (
		<div className='text-white'>
			<h2 className='mb-8'>You are currently involved in the Truth Consensus Algorithm for</h2>
			<h1 className='text-2xl font-semibold mb-4'>&lsquo;{question.title}&rsquo;</h1>
			<Link href={`questions/${question.id}?voting=1`} className='text-yellow-600 underline italic'>
				Click here to view evidence and cast your vote.
			</Link>
		</div>
	)

	const renderStates = [StepOne, StepTwo]

	return (
		<>
			<Head>
				<title>DLV | About</title>
				<meta name='description' content='DLV App' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='bg-gray-100'>
				<Header />
				<div className='min-h-screen'>
					<div className='bg-white mx-auto my-8 rounded-md p-10 max-w-screen-xl'>
						<div className='text-center'>
							<h1 className='text-2xl font-bold font-serif text-yellow-800'>About the Schelling Point System</h1>
							<hr className='text-black mx-auto mt-2 mb-8' />
							<p className='text-left my-4'>
								Lorem ipsum dolor sit amet, and more stuff like that. Blah blah blah.. all the text we need. Lorem ipsum
								dolor sit amet, and more stuff like that. Blah blah blah.. all the text we need. Lorem ipsum dolor sit
								amet, and more stuff like that. Blah blah blah.. all the text we need. Lorem ipsum dolor sit amet, and
								more stuff like that. Blah blah blah.. all the text we need. Lorem ipsum dolor sit amet, and more stuff
								like that. Blah blah blah.. all the text we need. Lorem ipsum dolor sit amet, and more stuff like that.
								Blah blah blah.. all the text we need.
							</p>
							<p className='text-left my-4'>
								Lorem ipsum dolor sit amet, and more stuff like that. Blah blah blah.. all the text we need. Lorem ipsum
								dolor sit amet, and more stuff like that. Blah blah blah.. all the text we need. Lorem ipsum dolor sit
								amet, and more stuff like that. Blah blah blah.. all the text we need. Lorem ipsum dolor sit amet, and
								more stuff like that. Blah blah blah.. all the text we need. Lorem ipsum dolor sit amet, and more stuff
								like that. Blah blah blah.. all the text we need. Lorem ipsum dolor sit amet, and more stuff like that.
								Blah blah blah.. all the text we need.
							</p>
						</div>
						{question ? (
							<div className='bg-stone-800 py-6 text-center rounded-xl my-8'>{renderStates[step]}</div>
						) : null}
					</div>
				</div>
			</div>
		</>
	)
}

export default SchellingPage
