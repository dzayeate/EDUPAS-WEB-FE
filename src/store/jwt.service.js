export const getToken = () => {
    return localStorage.getItem('token');
};

export const saveToken = (token) => {
    localStorage.setItem('token', token);
};

export const destroyToken = () => {
    localStorage.removeItem('token');
};

export const getUser = () => {
    return window.localStorage.getItem('userId');
};

export const saveUser = (data) => {
    window.localStorage.setItem('userId', data);
};

export const destroyUser = () => {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.removeItem('PHPSESSID');
};

export const getSession = () => {
    return window.localStorage.getItem('PHPSESSID');
};

export default {
    getToken,
    saveToken,
    destroyToken,
    getUser,
    saveUser,
    destroyUser,
    getSession,
};
