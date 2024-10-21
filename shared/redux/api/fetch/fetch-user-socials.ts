
import { baseUrl } from "@/utils/constants";
import { ApiControllers } from "../ApiControllers";
import { getAccessTokenValue } from "@/utils/functions";
import { UserSocials } from "@/models/social.models";

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
