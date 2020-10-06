export const getAuthInfo = () => {
  const [accessToken, expires] = ['accessToken', 'expires'].map(item => localStorage.getItem(item));

  return {accessToken, expires}
}

export const setLocalStorageKeysFromRequest = (login) => {
  const {access_token, expires, refresh_token} = login;

  const date = new Date();
  localStorage.setItem('accessToken', access_token);
  localStorage.setItem('expires', Math.round(date.getTime() / 1000) + expires);
  localStorage.setItem('refreshToken', refresh_token);
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
  ['accessToken', 'expires', 'refreshToken'].map(item => localStorage.removeItem(item));
};
