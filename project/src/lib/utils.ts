import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatAddress(address: string, start = 4, end = 4) {
	return `${address.slice(0, start)}...${address.slice(-end)}`;
}

// to format the SOL balance in a way that doesn't show too many zeros but still represents the data appropriately
export function formatNumber(num: number, maxDecimals = 6) {
	return parseFloat(num.toFixed(maxDecimals));
}
