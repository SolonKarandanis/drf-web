import { authOptions } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';

const Home = async () =>{
  const session = await getServerSession(authOptions);
  if(!session){
    redirect(`/auth/login`);
  }
  redirect(`/dashboard`);
}

export default Home;
