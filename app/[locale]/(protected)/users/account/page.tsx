import React from 'react'
import { basePath } from '@/next.config';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getUserGroupsCapitalized } from '@/utils/user-utils';


const UserAcoountPage = async () => {
    const path = process.env.NODE_ENV === "production" ? basePath : "";
    const session = await getServerSession(authOptions);
    const loggedInUser= session!.user!;

    const groupNames =getUserGroupsCapitalized(loggedInUser);
    const roles = groupNames.join(', ');
    return (
      <div>page</div>
    )
}

export default UserAcoountPage