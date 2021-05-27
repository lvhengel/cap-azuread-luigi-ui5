import oAuth2ImplicitGrant from '@luigi-project/plugin-auth-oauth2';

export const auth = {
  use: 'oAuth2ImplicitGrant',
  //storage: 'sessionStorage',
  oAuth2ImplicitGrant: {
    idpProvider: oAuth2ImplicitGrant,
    authorizeUrl:
      'https://login.microsoftonline.com/b00367e2-193a-4f48-94de-7245d45c0947/oauth2/v2.0/authorize',
    logoutUrl: 'logout.html',
    //post_logout_redirect_uri: '/logout.html',
    oAuthData: {
      response_type: 'id_token token',
      client_id: '09b96238-c657-4e31-9e50-fb01e258fe83',
      scope: 'openid profile api://09b96238-c657-4e31-9e50-fb01e258fe83/default'
    },
    userInfoFn: async (settings, authData) => {
      const userInfo = {};

      try {
        const data = parseJWT(authData.idToken);
        userInfo.email = data.preferred_username.toLocaleLowerCase();
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
        `https://login.microsoftonline.com/b00367e2-193a-4f48-94de-7245d45c0947/oauth2/logout?post_logout_redirect_uri=` +
          location.origin +
          '/logout.html'
      );
    }
  }
  // events: {
  //   onAuthSuccessful: (settings, authData) => {
  //     console.log(settings);
  //     console.log(authData);
  //   }
  // }
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
