import { CategoryFilters } from "@/types/filters";
import { create } from "zustand";

export const initialFilters: CategoryFilters = {
	search: "",
	pumpProgress: { min: "", max: "" },
	holders: { min: "", max: "" },
	devHolding: { min: "", max: "" },
	snipers: { min: "", max: "" },
	botHolders: { min: "", max: "" },
	age: { min: "", max: "" },
	currentLiquidity: { min: "", max: "" },
	volume: { min: "", max: "" },
	marketCap: { min: "", max: "" },
	transactions: { min: "", max: "" },
	buys: { min: "", max: "" },
	sells: { min: "", max: "" },
};

export type Category = "newlyCreated" | "aboutToGraduate" | "graduated";

interface FilterState {
	newlyCreated: CategoryFilters;
	aboutToGraduate: CategoryFilters;
	graduated: CategoryFilters;
	updateFilter: (args: {
		category: Category;
		newFilters: CategoryFilters;
	}) => void;
}

export const useFilters = create<FilterState>((set) => ({
	newlyCreated: initialFilters,
	aboutToGraduate: initialFilters,
	graduated: initialFilters,
	updateFilter: ({ category, newFilters }) =>
		set((filters) => ({
			...filters,
			[category]: {
				...newFilters,
			},
		})),
}));
