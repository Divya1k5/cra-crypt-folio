export const setObjInLocalStorage = (key, obj) => {
    localStorage.setItem(key, JSON.stringify(obj));
};

export const getObjFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

export const isMobileDevice = () => {
    if( /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) {
        return true;
    }
};