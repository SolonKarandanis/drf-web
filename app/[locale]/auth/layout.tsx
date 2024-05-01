import Authenticationlayout from "@/shared/layout-components/layout/authentication-layout";

interface Props {
	children: React.ReactNode;
}

export default function Layout({ children }: Props){
    return <Authenticationlayout>{children}</Authenticationlayout>
}