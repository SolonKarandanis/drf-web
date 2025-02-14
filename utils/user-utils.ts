import { User } from "next-auth";
import { capitalizeFirstLetter } from "./helpers";
import { UserAcount, UserGroup } from "@/models/user.models";

export const getUserGroups = (loggedUser: User| UserAcount):UserGroup[] => loggedUser.groups;

export const getUserPermissions = (loggedUser: User| UserAcount):string[] => loggedUser.permissions;

export const getUserGroupsCapitalized = (loggedUser: User| UserAcount):string[] =>  loggedUser.groups.map((group)=> capitalizeFirstLetter(group.name));

export const getAccessToken = (loggedUser: User):string => loggedUser.access;

export const getRefreshToken = (loggedUser: User):string => loggedUser.refresh;

export const hasRole = (loggedUser: User| UserAcount| undefined, role:string): boolean =>{
    if(!loggedUser){
        return false;
    }
    const found =loggedUser.groups.find(group=> group.name===role);
    return found ? true:false;
}

export const hasPermission = (loggedUser: User| UserAcount| undefined, permission:string):boolean =>{
    if(!loggedUser){
        return false;
    }
    const permissions = getUserPermissions(loggedUser);
    return permissions.includes(permission);
}
