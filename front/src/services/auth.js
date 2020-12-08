export const getAuthInfo = () => {
  const [accessToken, expires] = ['accessToken', 'expires'].map(item => localStorage.getItem(item));

  return {accessToken, expires}
}

export const setLocalStorageKeysFromRequest = (login) => {
  const {accessToken, expires, } = login;

  const date = new Date();
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('expires', Math.round(date.getTime() / 1000) + expires);
};

export const tokenIsValid = () => {
  const {expires} = getAuthInfo();
  const date = new Date();

  if (!expires) {
    return false;
  }

  return expires > date.getTime() / 1000;
};

export const logOut = () => {
  ['accessToken', 'expires'].map(item => localStorage.removeItem(item));
};
