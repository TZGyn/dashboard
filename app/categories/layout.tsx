export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<section className='flex flex-col items-center justify-center gap-4 pt-10 sm:pt-16'>
			{children}
		</section>
	)
}
