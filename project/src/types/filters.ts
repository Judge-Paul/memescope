export interface RangeFilter {
	min: string;
	max: string;
}

export interface CategoryFilters {
	search: string;
	pumpProgress: RangeFilter;
	holders: RangeFilter;
	devHolding: RangeFilter;
	snipers: RangeFilter;
	botHolders: RangeFilter;
	age: RangeFilter;
	currentLiquidity: RangeFilter;
	volume: RangeFilter;
	marketCap: RangeFilter;
	transactions: RangeFilter;
	buys: RangeFilter;
	sells: RangeFilter;
}

export interface CategoryState {
	showFilters: boolean;
	filters: CategoryFilters;
}
