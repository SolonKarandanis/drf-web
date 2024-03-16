function getStorageValue(key:string) {
    // getting stored value
    if (typeof window !== "undefined") {
        const saved = localStorage.getItem(key);
        if(saved){
            const initial = JSON.parse(saved);
            return initial;
        }
        
        return null;
    }
}

function setStorageValue(key:string,value:string){
    if (typeof window !== "undefined"){
        localStorage.setItem(key, JSON.stringify(value));
    }
    
}

function removeStorageValue(key:string){
    if (typeof window !== "undefined"){
        localStorage.removeItem(key);
    }
}

function setLoginResponseInStorage(response:LoginResponse){
    const {access,refresh} = response;
    setStorageValue('access',access);
	setStorageValue('refresh',refresh);
}

function removeLoginResponseFromStorage(){
    removeStorageValue('access');
	removeStorageValue('refresh');
}

function getAccessTokenValue(){
    return getStorageValue('access');
}

function getRefreshTokenValue(){
    return getStorageValue('refresh');
}

export {
    getStorageValue,
    setStorageValue,
    removeStorageValue,
    setLoginResponseInStorage,
    removeLoginResponseFromStorage,
    getAccessTokenValue,
    getRefreshTokenValue
}
