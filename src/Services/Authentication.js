import auth0 from 'auth0-js';

export const webAuth = new auth0.WebAuth({
  domain: 'xyzblocks.auth0.com',
  clientID: 'NRx_b3-TpwlpkzUD125UlX1vx02PFDeY',
  redirectUri: 'http://localhost:3000/callback',
  responseType: 'token id_token',
  scope: 'openid',
});

export function getUser() {
  const auth0 = localStorage.getItem('auth0') ? JSON.parse(localStorage.getItem('auth0')) : null;

  if (!auth0) {
    return Promise.resolve(null);
  }

  return validateToken(auth0.idToken, auth0.idTokenPayload.nonce);
}

function validateToken(token, nonce) {
  return new Promise((resolve, reject) => {
    webAuth.validateToken(token, nonce, (error, result) => {
      if (error) {
        reject(error);

        return;
      }

      console.log(result);

      resolve(result);
    });
  });
}
