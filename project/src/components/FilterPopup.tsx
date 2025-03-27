import { useState } from "react";
import {
	ChevronDown,
	DollarSign,
	Percent,
	SlidersHorizontal,
} from "lucide-react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import type { CategoryFilters, RangeFilter } from "@/types/filters";
import { Category, initialFilters, useFilters } from "@/store/useFilters";

interface FilterPopupProps {
	category: Category;
}

export default function FilterPopup({ category }: FilterPopupProps) {
	const [filters, setFilters] = useState<CategoryFilters>(initialFilters);
	const [activeFilterCount, setActiveFilterCount] = useState(0);
	const { updateFilter } = useFilters();

	const handleUpdateRange = (
		key: string,
		field: "min" | "max",
		value: string,
	) => {
		setFilters((prev) => ({
			...prev,
			[key]: {
				...(prev[key as keyof CategoryFilters] as RangeFilter),
				[field]: value,
			},
		}));
	};

	const handleReset = () => {
		setFilters(initialFilters);
		updateFilter({ category, newFilters: initialFilters });
		setActiveFilterCount(0);
	};

	const handleApply = () => {
		updateFilter({ category, newFilters: filters });

		let count = 0;

		const rangeFields: (keyof CategoryFilters)[] = [
			"search",
			"pumpProgress",
			"holders",
			"devHolding",
			"snipers",
			"botHolders",
			"age",
			"currentLiquidity",
			"volume",
			"marketCap",
			"transactions",
			"buys",
			"sells",
		];

		rangeFields.forEach((field) => {
			if (field === "search" && filters[field]) {
				count++;
				return;
			}
			const rangeFilter = filters[field] as RangeFilter;
			if (rangeFilter.min || rangeFilter.max) count++;
		});

		setActiveFilterCount(count);
	};

	const filterList: {
		key: keyof CategoryFilters;
		label: string;
		symbol: "%" | "$" | "";
	}[] = [
		{ key: "pumpProgress", label: "Pump Progress", symbol: "%" },
		{ key: "holders", label: "Holders Count", symbol: "" },
		{ key: "devHolding", label: "Dev Holding", symbol: "%" },
		{ key: "snipers", label: "Snipers", symbol: "" },
		{ key: "botHolders", label: "Bot Holders", symbol: "" },
		{ key: "age", label: "Age (mins)", symbol: "" },
		{ key: "currentLiquidity", label: "Current Liquidity", symbol: "$" },
		{ key: "volume", label: "Volume", symbol: "$" },
		{ key: "marketCap", label: "Market Cap", symbol: "$" },
		{ key: "transactions", label: "Transactions", symbol: "" },
		{ key: "buys", label: "Buys", symbol: "" },
		{ key: "sells", label: "Sells", symbol: "" },
	];

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className="flex items-center gap-1.5 rounded-full h-9 px-3 sm:px-4"
				>
					<SlidersHorizontal
						size={16}
						className="text-gray-700 dark:text-gray-400"
					/>
					<span className="hidden sm:inline">Filters</span>
					{activeFilterCount > 0 && (
						<Badge variant="secondary" className="h-5 px-1.5 text-xs">
							{activeFilterCount}
						</Badge>
					)}
					<ChevronDown size={16} className="hidden sm:block text-gray-500" />
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[90vw] sm:max-w-[600px] max-h-[90vh] rounded-2xl overflow-hidden flex flex-col">
				<DialogHeader>
					<DialogTitle className="text-xl">
						"
						{category === "newlyCreated"
							? "Newly Created"
							: category === "aboutToGraduate"
							? "About to Graduate"
							: "Graduated"}
						" Filters
					</DialogTitle>
				</DialogHeader>

				<div className="overflow-y-auto pr-2 -mr-2">
					<div className="space-y-4 py-2">
						<div className="grid grid-cols-1 sm:grid-cols-5 items-center space-y-2">
							<Label className="col-span-2 text-sm font-medium">
								Symbol/Name Search
							</Label>
							<div className="col-span-3 flex items-center w-full gap-3">
								<div className="w-full relative">
									<Input
										type="text"
										value={filters.search}
										placeholder="Symbol or name"
										onChange={(e) =>
											setFilters((prev) => ({
												...prev,
												search: e.target.value,
											}))
										}
										className="bg-accent pl-3 rounded-lg pr-7"
									/>
								</div>
							</div>
						</div>
						{filterList.map(({ key, label, symbol }) => {
							const rangeFilter = filters[key] as RangeFilter;
							return (
								<div
									key={key}
									className="grid grid-cols-1 sm:grid-cols-5 items-center space-y-2"
								>
									<Label className="col-span-2 text-sm font-medium">
										{label}
									</Label>
									<div className="col-span-3 flex items-center w-full gap-3">
										<div className="w-full relative">
											<Input
												placeholder="Min"
												value={rangeFilter.min}
												onChange={(e) =>
													handleUpdateRange(key, "min", e.target.value)
												}
												className="bg-accent pl-3 rounded-lg pr-7"
											/>

											{symbol && (
												<div className="absolute right-2 top-1/2 transform -translate-y-1/2">
													{symbol === "$" ? (
														<DollarSign size={15} />
													) : (
														<Percent size={15} />
													)}
												</div>
											)}
										</div>
										<span className="text-muted-foreground">to</span>

										<div className="w-full relative">
											<Input
												placeholder="Max"
												value={rangeFilter.max}
												onChange={(e) =>
													handleUpdateRange(key, "max", e.target.value)
												}
												className="bg-accent pl-3 rounded-lg pr-7"
											/>
											{symbol && (
												<div className="absolute right-2 top-1/2 transform -translate-y-1/2">
													{symbol === "$" ? (
														<DollarSign size={15} />
													) : (
														<Percent size={15} />
													)}
												</div>
											)}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				<div className="mt-6 w-full flex gap-2.5 sm:gap-0 justify-between">
					<Button
						type="button"
						variant="outline"
						onClick={handleReset}
						className="rounded-full dark:text-white w-full sm:w-40"
					>
						Reset All
					</Button>
					<DialogClose asChild>
						<Button
							type="button"
							onClick={handleApply}
							className="rounded-full bg-accent-purple text-white w-full sm:w-40 hover:bg-accent-purple/80"
						>
							Apply Filters
						</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	);
}
