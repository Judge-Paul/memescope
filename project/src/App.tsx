import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import MemeScope from "@/pages/MemeScope";

function App() {
	return (
		<ThemeProvider>
			<Toaster richColors position="top-right" />
			<MemeScope />
		</ThemeProvider>
	);
}

export default App;
