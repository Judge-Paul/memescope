import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import ModeToggle from "@/components/mode-toggle";
import Phantom from "@/assets/phantom.png";
import Solflare from "@/assets/solflare.png";
import Solana from "@/assets/solana.png";
import { accounts } from "@/data/accounts";
import { cn, formatAddress, formatNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTradeSettings } from "@/store/useTradeSettings";
import { Sparkles } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
	const {
		selectedAccount,
		setSelectedAccount,
		quickBuy,
		toggleQuickBuy,
		quickBuyAmount,
		setQuickBuyAmount,
	} = useTradeSettings();

	const [selectedPreset, setSelectedPreset] = useState("S1");
	return (
		<div className="flex flex-wrap lg:flex-nowrap gap-4 items-center justify-between">
			<div className="flex flex-wrap lg:flex-nowrap items-center gap-4">
				<div className="max-w-60">
					<Select
						defaultValue={selectedAccount?.address}
						onValueChange={setSelectedAccount}
					>
						<SelectTrigger className="flex gap-4 border border-accent-purple/40 px-4 hover:bg-background/100 font-bold rounded-full h-10">
							<SelectValue placeholder="Select a wallet" />
						</SelectTrigger>
						<SelectContent className="mt-1">
							{accounts.map((account) => (
								<SelectItem key={account.address} value={account.address}>
									<div className="flex items-center gap-2 w-52">
										<img
											src={account.wallet === "Phantom" ? Phantom : Solflare}
											alt={`${account.wallet} ${account.name}`}
											className="w-5 aspect-square rounded-full"
										/>
										{account.name} ({formatAddress(account.address)})
									</div>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<Button
					onClick={toggleQuickBuy}
					variant="outline"
					className={cn(
						"rounded-full border border-accent-purple/40 text-primary px-5 hover:bg-white/0",
						"transition-all duration-300 ease-in-out hover:border-2 hover:border-accent-purple hover:scale-95 active:scale-90",
						quickBuy &&
							"bg-accent-purple text-white hover:text-white hover:bg-accent-purple/90",
					)}
				>
					<Sparkles
						className={cn(
							"w-4 h-4 transition-all duration-300",
							quickBuy ? "opacity-100 rotate-0" : "opacity-70 rotate-12",
						)}
						fill={quickBuy ? "white" : "none"}
					/>
					Quick Buy
				</Button>
				<div className="relative">
					<div className="absolute left-4 top-1/2 transform -translate-y-1/2">
						<img src={Solana} className="w-5 aspect-square mr-2" />
					</div>
					<Input
						type="text"
						defaultValue={quickBuyAmount}
						onChange={(e) => setQuickBuyAmount(e.target.value)}
						className="pl-11 rounded-full w-24 pr-4 border border-accent-purple/40"
					/>
				</div>
				<div className="w-px h-6 bg-secondary-foreground hidden md:block" />
				<div className="flex items-center gap-2.5">
					<h4 className="font-bold">Presets</h4>
					<div
						className={cn(
							"rounded-full bg-secondary py-2 px-6 flex gap-2.5",
							"bg-gradient-to-b from-gray-300 via-white to-gray-300 dark:from-black dark:via-90% dark:via-gray-600 dark:to-black",
						)}
					>
						{["S1", "S2", "S3"].map((preset) => (
							<button
								onClick={() => setSelectedPreset(preset)}
								key={preset}
								className={cn(
									"font-semibold text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400",
									selectedPreset === preset && "text-primary dark:text-primary",
								)}
							>
								{preset}
							</button>
						))}
					</div>
				</div>
			</div>
			<div className="flex items-center w-full md:w-max gap-4 justify-between md:justify-normal">
				<div className="border border-accent-purple/40 rounded-full h-10 flex items-center px-4">
					Bal: {formatNumber(selectedAccount?.solBalance || 0.0)} SOL
				</div>
				<ModeToggle />
			</div>
		</div>
	);
}
