import { authOptions } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';
import { useLocale } from "next-intl";

const Home = async () =>{
  const session = await getServerSession(authOptions);
  const locale = useLocale();
  if(!session){
    redirect(`/${locale}/auth/login`);
  }
  redirect(`/${locale}/dashboard`);
}

export default Home;
