export interface ContainerProps {
	children: React.ReactNode;
}

function Container({ children }: ContainerProps) {
	return (
		<div className="bg-gradient-to-br from-red-50 from-10% via-amber-50 dark:via-20% to-violet-100 to-90% dark:from-gray-900 dark:from-10% dark:via-gray-700 via-20% dark:to-gray-500 dark:to-90% min-h-screen">
			<section className="container mx-auto px-4 py-8">{children}</section>
		</div>
	);
}

export default Container;
