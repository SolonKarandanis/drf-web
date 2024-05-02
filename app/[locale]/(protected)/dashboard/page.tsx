import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";

const Page = async () => {
  const session = await getServerSession(authOptions);
  console.log('Dashboard')
  console.log( session)
  const olderDate = new Date('2022-10-31');
  const currentDate = new Date('2022-11-01');

  const diff = olderDate.valueOf()- currentDate.valueOf()
  const formatter = new Intl.RelativeTimeFormat('en', { 
    numeric: 'always' 
  });
  const d=formatter.format(Math.round(diff / 86400000), 'day')
  return (
    <div>
      {/* {d} */}

      {session ? (
        <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
      ):(
        <Link href="/api/auth/signin">Login</Link>
      )}
    </div>
  )
}

export default Page