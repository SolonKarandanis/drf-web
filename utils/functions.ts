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

function escape(s:string) { 
    return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); 
}

function getCookie(name:string) {
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}

function getClientLocale(){
    return getCookie('NEXT_LOCALE');
}

export {
    getStorageValue,
    setStorageValue,
    removeStorageValue,
    setLoginResponseInStorage,
    removeLoginResponseFromStorage,
    getAccessTokenValue,
    getRefreshTokenValue,
    getClientLocale
}
