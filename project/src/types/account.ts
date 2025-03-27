export interface Account {
	wallet: "Phantom" | "Solflare";
	name: string;
	solBalance: number;
	address: string;
}
