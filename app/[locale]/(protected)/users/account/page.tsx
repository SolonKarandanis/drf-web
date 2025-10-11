import React from 'react'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getUserGroupsCapitalized } from '@/utils/user-utils';


const UserAcoountPage = async () => {
    const session = await getServerSession(authOptions);
    const loggedInUser= session!.user!;

    getUserGroupsCapitalized(loggedInUser);
    return (
      <div>page</div>
    )
}

export default UserAcoountPage