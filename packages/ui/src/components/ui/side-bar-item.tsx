"use client";

import { usePathname, useRouter } from "next/navigation";

import { cn } from "../../lib/utils";
import { Button } from "./button";

interface SideBarItemProps {
	href: string;
	title: string;
	icon: React.ReactNode;
}

const SideBarItem = ({ href, title, icon }: SideBarItemProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const selected = pathname === href;

	return (
		<Button
			variant="ghost"
			onClick={() => router.push(href)}
			className={cn(
				"flex flex-row items-center justify-start gap-x-2 max-w-40 bg-gray-50 hover:bg-gray-200",
				selected && "bg-gray-200"
			)}
		>
			{icon}
			{title}
		</Button>
	);
};

export { SideBarItem };
