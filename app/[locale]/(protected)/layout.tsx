import RequireAuth  from '@/components/utils/RequireAuth';
import ContentLayout from '@/shared/layout-components/layout/content-layout';
import { Locale, locales } from '@/utils/locales';
import { unstable_setRequestLocale } from 'next-intl/server';

type Props = {
	children: React.ReactNode;
	params: {
	  locale: Locale;
	};
};


export default function Layout({ children,params:{locale} }: Props) {
	unstable_setRequestLocale(locale);
	return (
		// <RequireAuth>
			<ContentLayout>
				{children}
			</ContentLayout>
		// </RequireAuth>
	);
}

export function generateStaticParams() {
	return locales.map((locale) => ({locale}));
}
