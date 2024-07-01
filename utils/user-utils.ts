import { User } from "next-auth";
import { capitalizeFirstLetter } from "./helpers";
import { UserAcount } from "@/models/user.models";

export const getUserGroups = (loggedUser: User| UserAcount) =>  loggedUser.groups.map((group)=> capitalizeFirstLetter(group.name));

export const getAccessToken = (loggedUser: User) => loggedUser.access;

export const getRefreshToken = (loggedUser: User) => loggedUser.refresh;
