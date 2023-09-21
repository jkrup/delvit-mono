import React, { useState } from 'react'

export const timeToReadibleAgo = (past: Date) => {
	const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
	const now = new Date()
	const diff = Math.floor((Number(now) - Number(past)) / 1000) // diff in seconds
	if (diff < 60) {
		// 1 min
		return 'just now'
	}
	if (diff < 60 * 60) {
		return rtf.format(-Math.floor(diff / 60), 'minute')
	}

	if (diff < 60 * 60 * 24) {
		return rtf.format(-Math.floor(diff / (60 * 60)), 'hour')
	}

	if (diff < 60 * 60 * 24 * 7) {
		return rtf.format(-Math.floor(diff / (60 * 60 * 24)), 'day')
	}

	if (diff < 60 * 60 * 24 * 30) {
		return rtf.format(-Math.floor(diff / (60 * 60 * 24 * 7)), 'week')
	}

	return rtf.format(-Math.floor(diff / (60 * 60 * 24 * 30)), 'month')
}

export function useBoolState(init?: boolean) {
	const [state, setState] = useState(!!init)
	return {
		val: state,
		set: setState,
		setFalse() {
			setState(false)
		},
		setTrue() {
			console.log('setting true')
			setState(true)
		},
	}
}
export type useBoolStateT = ReturnType<typeof useBoolState>

export function useStringState(init: string | null = null) {
	const [state, setState] = useState(init)
	return {
		val: state,
		set: setState,
		clear() {
			setState('')
		},
	}
}
export type useStringStateT = ReturnType<typeof useStringState>

export function useObjState<T extends object | null>(init: T = {} as T) {
	const [state, setState] = useState(init)
	return {
		val: state,
		set: setState,
		reset() {
			setState(init)
		},
	}
}
export type useObjStateT = ReturnType<typeof useObjState>

export function wrapPreventDefault(fn: React.EventHandler<React.SyntheticEvent>) {
	return (e: React.SyntheticEvent) => {
		e.preventDefault()
		fn(e)
	}
}


export function wrapStopPropagation(fn: React.EventHandler<React.SyntheticEvent>) {
	return (e: React.SyntheticEvent) => {
		e.stopPropagation()
		fn(e)
	}
}
