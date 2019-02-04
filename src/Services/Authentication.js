import auth0 from 'auth0-js';

export const webAuth = new auth0.WebAuth({
  domain: 'xyzblocks.auth0.com',
  clientID: 'NRx_b3-TpwlpkzUD125UlX1vx02PFDeY',
  redirectUri: `${window.location.origin}/callback`,
  responseType: 'token id_token',
  scope: 'openid',
});

export async function getUser() {
  const auth0 = localStorage.getItem('auth0') ? JSON.parse(localStorage.getItem('auth0')) : null;

  if (!auth0) {
    return null;
  }

  try {
    return await validateToken(auth0.idToken, auth0.idTokenPayload.nonce);
  } catch {
    return null;
  }
}

function validateToken(token, nonce) {
  return new Promise((resolve, reject) => {
    webAuth.validateToken(token, nonce, (error, result) => {
      if (error) {
        reject(error);

        return;
      }

      resolve(result);
    });
  });
}
