import oAuth2ImplicitGrant from '@luigi-project/plugin-auth-oauth2';

export const auth = {
  use: 'oAuth2ImplicitGrant',
  //storage: 'sessionStorage',
  oAuth2ImplicitGrant: {
    idpProvider: oAuth2ImplicitGrant,
    authorizeUrl:
      'https://login.microsoftonline.com/8ae5d2a5-eec7-40ad-b1ca-8d997fd0d348/oauth2/v2.0/authorize',
    logoutUrl: 'logout.html',
    //post_logout_redirect_uri: '/logout.html',
    oAuthData: {
      response_type: 'id_token token',
      client_id: '25efc86f-fac5-46a4-9963-9cbafbe02167',
      scope: 'openid profile api://25efc86f-fac5-46a4-9963-9cbafbe02167/default'
    },
    userInfoFn: async (settings, authData) => {
      const userInfo = {};

      try {
        const data = parseJWT(authData.idToken);
        //userInfo.name = data.name;
        userInfo.email = data.preferred_username;
        userInfo.email = userInfo.email.toLocaleLowerCase();
      } catch (err) {
        console.error('Could not parse JWT token', err);
      }

      return userInfo;
    },
    logoutFn: async (settings, authData, logoutCallback) => {
      window.localStorage.removeItem('email');
      window.localStorage.removeItem('accessToken');
      window.localStorage.clear();
      Luigi.auth().store.removeAuthData();

      window.location.replace(
        `https://login.microsoftonline.com/8ae5d2a5-eec7-40ad-b1ca-8d997fd0d348/oauth2/logout?post_logout_redirect_uri=` +
          location.origin +
          '/logout.html'
      );

      //logoutCallback('/logout.html');
    }
  }
  //disableAutoLogin: true
};

function parseJWT(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
}
