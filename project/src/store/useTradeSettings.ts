import { accounts } from "@/data/accounts";
import { Account } from "@/types/account";
import { create } from "zustand";

interface TradeSettings {
	selectedAccount: Account | null;
	setSelectedAccount: (accAddress: string) => void;
	quickBuy: boolean;
	toggleQuickBuy: () => void;
	quickBuyAmount: number;
	setQuickBuyAmount: (value: string) => void;
	presets: string[];
}

export const useTradeSettings = create<TradeSettings>((set) => ({
	selectedAccount: accounts[0],
	setSelectedAccount: (accAddress) => {
		const account = accounts.find((a) => a.address === accAddress);
		if (account) {
			set({ selectedAccount: account });
		}
	},
	quickBuy: false,
	toggleQuickBuy: () => set((state) => ({ quickBuy: !state.quickBuy })),
	quickBuyAmount: 0.01,
	setQuickBuyAmount: (value) => set({ quickBuyAmount: Number(value) }),
	presets: ["S1", "S2", "S3"],
}));
