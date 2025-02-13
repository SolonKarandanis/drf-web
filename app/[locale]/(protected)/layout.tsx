import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import SetTokensLocalStorage from '@/components/auth/set-tokens-localstorage';
import ContentLayout from '@/shared/layout-components/layout/content-layout';
import { Locale, locales } from '@/utils/locales';
import { getServerSession } from 'next-auth';
import { unstable_setRequestLocale } from 'next-intl/server';
import { basePath } from '@/next.config';
import SetConfig from '@/components/auth/set-config';
import { ConfigModel } from '@/models/config.model';
import SetSocials from '@/components/auth/set-socials';
import SetProductMisc from '@/components/auth/set-product-misc';

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
	const djangoHost = process.env.NEXT_PUBLIC_HOST;

	const config = {
		baseUrl: path,
		djangoHost
	} as ConfigModel

	return (
		<ContentLayout>
			<SetTokensLocalStorage />
			<SetConfig config={config} />
			<SetSocials />
			<SetProductMisc />
			{children}
		</ContentLayout>
	)
}

export function generateStaticParams() {
	return locales.map((locale) => ({locale}));
}
