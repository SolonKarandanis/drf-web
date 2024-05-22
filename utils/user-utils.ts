import { User } from "next-auth";
import { capitalizeFirstLetter } from "./helpers";

export const getUserGroups = (loggedUser: User) =>  loggedUser.groups.map((group)=> capitalizeFirstLetter(group.name));