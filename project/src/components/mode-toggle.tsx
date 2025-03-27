import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export default function ModeToggle() {
	const { theme, setTheme } = useTheme();
	const [isDarkMode, setIsDarkMode] = React.useState(false);

	React.useEffect(() => {
		setIsDarkMode(theme === "dark");
	}, [theme]);

	const toggleDarkMode = () => {
		setTheme(isDarkMode ? "light" : "dark");
	};

	return (
		<Button
			variant="outline"
			className="h-10 rounded-full w-16 dark:bg-accent-orange/80 dark:hover:bg-accent-orange bg-blue-800 hover:bg-accent-blue border-transparent"
			onClick={toggleDarkMode}
		>
			<Sun
				className="h-[1.2rem] w-[1.2rem] hidden dark:flex"
				fill="white"
				stroke="white"
			/>
			<Moon
				className="h-[1.2rem] w-[1.2rem] dark:hidden"
				stroke="white"
				fill="white"
			/>
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
