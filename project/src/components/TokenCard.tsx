import React, { useMemo } from "react";
import {
	Zap,
	Copy,
	Search,
	User,
	ChartCandlestick,
	BadgeDollarSign,
	Coins,
	Bot,
	Target,
	Cog,
} from "lucide-react";
import type { Token } from "../types/token";
import { cn, formatNumber } from "@/lib/utils";
import { toast } from "sonner";
import { FaXTwitter, FaGlobe } from "react-icons/fa6";
import { CiPill } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import Solana from "@/assets/solana.png";
import { Progress } from "@/components/ui/progress";

interface TokenCardProps {
	token: Token;
	quickBuy: boolean;
	quickBuyAmount: number;
}

const formatTimeAgo = (timestamp: string) => {
	const date = new Date(timestamp);
	const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
	if (seconds < 60) return `${seconds}s`;
	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) return `${minutes}m`;
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours}h`;
	return `${Math.floor(hours / 24)}d`;
};

const TokenCard: React.FC<TokenCardProps> = ({
	token,
	quickBuy,
	quickBuyAmount,
}) => {
	const getProgress = useMemo(() => {
		// Check if token is in graduated list
		if (token.price.includes("K") && parseInt(token.price) > 100) {
			return 100;
		}

		// Check if token is about to graduate
		if (parseInt(token.price) > 10) {
			const seed = token.address
				.split("")
				.reduce((acc, char) => acc + char.charCodeAt(0), 0);
			const random = (seed % 25) + 75;
			return random;
		}

		const baseProgress = token.stats.priceChange5m
			? Math.min(Math.max(parseFloat(token.stats.priceChange5m), 0), 100)
			: 0;
		return Math.min(baseProgress, 30);
	}, [token]);

	const progress = getProgress;

	return (
		<div
			className={cn(
				"flex justify-between bg-accent p-2.5 rounded-lg",
				"hover:border border-accent-green",
			)}
		>
			<div>
				<div className="flex gap-2.5">
					<div className="items-center">
						<img
							src={token.imageUrl}
							className="bg-gray-400 dark:bg-gray-300 size-20 rounded-full"
						/>
					</div>
					<div className="flex flex-col gap-2 justify-between">
						<span className="flex items-center h-max gap-2">
							<h4 className="font-bold">{token.symbol}</h4>
							<p className="text-xs text-foreground-secondary font-light">
								{token.name}
							</p>
						</span>
						<span className="flex items-center gap-2">
							{token.address}
							<Copy
								onClick={() => toast.info("Contract Address copied")}
								size={16}
								className="cursor-pointer hover:text-black/50 dark:hover:text-white/50"
							/>
							{!token?.social?.twitter && (
								<a
									href={`https://x.com/search?q=${token.address}`}
									target="_blank"
									className="cursor-pointer hover:text-black/50 dark:hover:text-white/50"
								>
									<Search size={16} />
								</a>
							)}
						</span>
						<span className="flex items-center gap-2">
							{!token?.social?.twitter && (
								<a
									href={token.social.twitter + "hi"}
									target="_blank"
									className="cursor-pointer hover:text-black/50 dark:hover:text-white/50"
								>
									<FaXTwitter size={16} />
								</a>
							)}
							{!token?.social?.website && (
								<a
									href={token.social.website + "hi"}
									target="_blank"
									className="cursor-pointer hover:text-black/50 dark:hover:text-white/50"
								>
									<FaGlobe size={16} />
								</a>
							)}
							<a
								href={`https://pump.fun/token/${token.address}`}
								target="_blank"
								className="cursor-pointer hover:text-black/50 dark:hover:text-white/50"
							>
								<CiPill size={19} />
							</a>
						</span>
					</div>
				</div>
				<div className="mt-1.5 flex flex-col items-center max-w-20">
					<Progress value={progress} className="w-full h-1" />
					<p>{formatTimeAgo(token.createdAt)}</p>
				</div>
			</div>
			<div className="flex flex-col">
				<Button
					variant="outline"
					className={cn(
						"flex items-center gap-1 rounded-full h-12 w-32 ml-auto font-bold text-base text-white",
						"bg-gradient-to-br from-accent-blue via-accent-blue to-accent-purple",
						"transition-all duration-300 ease-in-out hover:scale-105 active:scale-95",
					)}
				>
					{quickBuy && <Zap fill="white" size={14} />}
					<img src={Solana} className="w-3.5 aspect-square mr-1" />
					{formatNumber(quickBuyAmount || 0)}
				</Button>
				<span className="mt-2 flex gap-1.5 text-xs ml-auto">
					<span
						className="flex items-center gap-0.5 cursor-default"
						title="Holder Count"
					>
						<User fill="white" size={14} />
						{token.holders}
					</span>
					<span
						className="flex items-center gap-0.5 cursor-default"
						title="Volume"
					>
						<ChartCandlestick size={14} />
						{token.volume}
					</span>
					<span
						className="flex items-center gap-0.5 cursor-default"
						title="Market Cap"
					>
						<BadgeDollarSign size={14} />
						{token.marketCap}
					</span>
				</span>
				<span className="mt-1.5 flex gap-1.5 text-xs ml-auto">
					<span
						className="flex items-center gap-0.5 cursor-default"
						title="Percent of tokens held by top 10 wallets"
					>
						<Coins size={14} />
						{token.holders + "%"}
					</span>
					<span
						className="flex items-center gap-0.5 cursor-default"
						title="Percent of tokens held by the dev team"
					>
						<Cog size={14} />
						{token.holders + "%"}
						{/* ideally should be the number of tokens held by dev team */}
					</span>
					<span
						className="flex items-center gap-0.5 cursor-default"
						title="Number of snipers trading this token"
					>
						<Target size={14} />
						{token.buys} {/* ideally should be snipers number, if possible */}
					</span>
					<span
						className="flex items-center gap-0.5 cursor-default"
						title="Number of bots trading this token"
					>
						<Bot size={14} />
						{token.sells} {/* ideally should be bots number */}
					</span>
				</span>
			</div>
		</div>
	);
};

export default TokenCard;
