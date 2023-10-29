import React, { ChangeEventHandler } from 'react'

export interface inputProps {
	type?: string
	onChange: ChangeEventHandler<HTMLInputElement>
	value: string
	classname?: string
	placeholder?: string
}
const TextInput = ({ type, onChange, value, placeholder, classname }: inputProps) => {
	return (
		<div className='my-3'>
			<input
				className={`border w-full p-3 border-gold rounded-lg placeholder:font-light placeholder-gold ${classname}`}
				onChange={onChange}
				placeholder={placeholder}
				type='text'
				name=''
				value={value}
			/>
		</div>
	)
}

export default TextInput
