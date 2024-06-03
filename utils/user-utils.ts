import { User } from "next-auth";
import { capitalizeFirstLetter } from "./helpers";

export const getUserGroups = (loggedUser: User) =>  loggedUser.groups.map((group)=> capitalizeFirstLetter(group.name));

export const getAccessToken = (loggedUser: User) => loggedUser.access;

export const getRefreshToken = (loggedUser: User) => loggedUser.refresh;
