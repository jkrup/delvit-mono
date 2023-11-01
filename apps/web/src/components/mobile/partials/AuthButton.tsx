import React, { ReactNode } from 'react'

export interface AuthBtnProps {
	onClick: () => void
	text: string
	classname?: string
	icon?: ReactNode
}
const AuthButton = ({ text, classname, onClick, icon }: AuthBtnProps) => {
	return (
		<button
			onClick={onClick}
			className={`p-2 my-3 bg-white  w-full hover:bg-black hover:text-white text-black rounded-lg border flex items-center ${classname}`}
		>
			<div className='w-1/5 flex justify-center'>{icon}</div>
			<div className='w-4/5'>{text}</div>
		</button>
	)
}

export default AuthButton
