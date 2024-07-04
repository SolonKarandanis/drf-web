import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import SetTokensLocalStorage from '@/components/auth/set-tokens-localstorage';
import ContentLayout from '@/shared/layout-components/layout/content-layout';
import { Locale, locales } from '@/utils/locales';
import { getServerSession } from 'next-auth';
import { unstable_setRequestLocale } from 'next-intl/server';
import { basePath } from '@/next.config';
import Setpath from '@/components/auth/set-path';

type Props = {
	children: React.ReactNode;
	params: {
	  locale: Locale;
	};
};


export default async function Layout({ children,params:{locale} }: Props) {
	const session = await getServerSession(authOptions);
	const user =session?.user
	console.log('-------->Layout')
	console.log(user)
	unstable_setRequestLocale(locale);
	const path = process.env.NODE_ENV === "production" ? basePath : "";

	return (
		<ContentLayout>
			<SetTokensLocalStorage />
			<Setpath path={path} />
			{children}
		</ContentLayout>
	)
}

export function generateStaticParams() {
	return locales.map((locale) => ({locale}));
}
