import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function oklchToRgb(l: number, c: number, h: number): string {
	const lNorm = Math.min(Math.max(l, 0), 1)
	const cNorm = Math.min(Math.max(c, 0), 0.4)
	const hRad = (h % 360) * (Math.PI / 180)

	const r = Math.round(255 * lNorm * (1 + cNorm * Math.cos(hRad)))
	const g = Math.round(255 * lNorm * (1 + cNorm * Math.cos(hRad - (2 * Math.PI) / 3)))
	const b = Math.round(255 * lNorm * (1 + cNorm * Math.cos(hRad + (2 * Math.PI) / 3)))

	return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`
}

export function hexToRgb(hex: string): string {
	const hexColor = hex.startsWith('#') ? hex.slice(1) : hex

	if (hexColor.length === 3) {
		const [r, g, b] = hexColor.split('')
		return `${parseInt(r + r, 16)}, ${parseInt(g + g, 16)}, ${parseInt(b + b, 16)}`
	}

	if (hexColor.length === 6) {
		const r = parseInt(hexColor.slice(0, 2), 16)
		const g = parseInt(hexColor.slice(2, 4), 16)
		const b = parseInt(hexColor.slice(4, 6), 16)
		return `${r}, ${g}, ${b}`
	}

	return '244, 219, 124'
}

export type CssColor = string & { _brand: 'cssColor' }
