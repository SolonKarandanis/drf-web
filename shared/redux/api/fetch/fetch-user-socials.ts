import { UserSocials } from "@/models/user.models";
import { baseUrl } from "@/utils/constants";
import { ApiControllers } from "../ApiControllers";
import { getAccessTokenValue } from "@/utils/functions";

export const fetchUserSocials = async (uuid:string): Promise<UserSocials[]> => {
    const data = await fetch(`${baseUrl}/${ApiControllers.USERS}/${uuid}`,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${getAccessTokenValue()}`
        }
    }).then((res) => {
      return res.json();
    });
  
    return data;
}
