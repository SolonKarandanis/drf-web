import { User } from "next-auth";
import { capitalizeFirstLetter } from "./helpers";
import { UserAcount, UserGroup } from "@/models/user.models";

export const getUserGroups = (loggedUser: User| UserAcount):UserGroup[] => loggedUser.groups;

export const getUserPermissions = (loggedUser: User| UserAcount):string[] => loggedUser.permissions;

export const getUserGroupsCapitalized = (loggedUser: User| UserAcount):string[] =>  loggedUser.groups.map((group)=> capitalizeFirstLetter(group.name));

export const getAccessToken = (loggedUser: User):string => loggedUser.access;

export const getRefreshToken = (loggedUser: User):string => loggedUser.refresh;

export const hasRole = (loggedUser: User| UserAcount, role:string): boolean =>{
    const found =loggedUser.groups.find(group=> group.name===role);
    return found ? true:false;
}

export const hasPermission = (loggedUser: User| UserAcount, permission:string):boolean =>{
    const permissions = getUserPermissions(loggedUser);
    const found = permissions.find(perm=>perm=permission);
    return found ? true: false;
}
