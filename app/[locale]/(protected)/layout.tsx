import RequireAuth  from '@/components/utils/RequireAuth';
import ContentLayout from '@/shared/layout-components/layout/content-layout';

interface Props {
	children: React.ReactNode;
}

export default function Layout({ children }: Props) {
	return (
	<RequireAuth>
		<ContentLayout>{children}</ContentLayout>
	</RequireAuth>);
}