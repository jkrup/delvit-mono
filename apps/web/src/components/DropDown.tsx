type DropDownProps = {
	children?: React.ReactNode
	disabled?: boolean
	className?: string
	onSelect: React.ChangeEventHandler<HTMLSelectElement>
}

const DropDown: React.FC<DropDownProps> = ({ children, onSelect, disabled, className }) => {
	return (
		<select
			id='evidence'
			className={`bg-inherit focus:outline-none outline-none ${className}`}
			onChange={onSelect}
			disabled={disabled}
		>
			{children}
		</select>
	)
}

export default DropDown
