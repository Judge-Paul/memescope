import TokenCard from "@/components/TokenCard";
import {
	sampleTokens,
	graduatingTokens,
	graduatedTokens,
} from "../data/tokens";
import Navbar from "@/components/navbar";
import FilterPopup from "@/components/FilterPopup";
import { useTradeSettings } from "@/store/useTradeSettings";

export default function MemeScope() {
	const { quickBuy, quickBuyAmount } = useTradeSettings();

	return (
		<div className="bg-background w-full min-h-screen max-w-[120rem] mx-auto text-foreground p-4">
			<h1 className="text-2xl font-bold mb-2">MEMESCOPE</h1>
			<p className="text-foreground-secondary mb-6">
				Customized real-time feeds of pump.fun tokens matching your selected
				preset filters.
			</p>
			<Navbar />

			{/* Token Lists */}
			<div className="mt-3 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
				{/* Newly Created */}
				<div className="border border-secondary rounded-lg px-4 py-2.5">
					<div className="flex items-center justify-between">
						<h4 className="font-[800] text-accent-purple">NEWLY CREATED</h4>
						<FilterPopup category="newlyCreated" />
					</div>
					<div className="mt-2 md:max-h-[32rem] overflow-y-auto space-y-2">
						{sampleTokens.map((token) => (
							<TokenCard
								key={token.address}
								token={token}
								quickBuy={quickBuy}
								quickBuyAmount={quickBuyAmount}
							/>
						))}
					</div>
				</div>

				{/* About to Graduate */}
				<div className="border border-secondary rounded-lg px-4 py-2.5">
					<div className="flex items-center justify-between">
						<h4 className="font-[800] text-accent-purple">ABOUT TO GRADUATE</h4>
						<FilterPopup category="aboutToGraduate" />
					</div>
					<div className="mt-2 md:max-h-[32rem] overflow-y-auto space-y-2">
						{graduatingTokens.map((token) => (
							<TokenCard
								key={token.address}
								token={token}
								quickBuy={quickBuy}
								quickBuyAmount={quickBuyAmount}
							/>
						))}
					</div>
				</div>

				{/* Graduated */}
				<div className="border border-secondary rounded-lg px-4 py-2.5">
					<div className="flex items-center justify-between">
						<h4 className="font-[800] text-accent-purple">GRADUATED</h4>
						<FilterPopup category="graduated" />
					</div>
					<div className="mt-2 md:max-h-[32rem] overflow-y-auto space-y-2">
						{graduatedTokens.map((token) => (
							<TokenCard
								key={token.address}
								token={token}
								quickBuy={quickBuy}
								quickBuyAmount={quickBuyAmount}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
