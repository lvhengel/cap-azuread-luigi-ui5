import { auth } from './auth';
import { navigation, getNavigationData, resolveNavigation } from './navigation';

(async () => {
  const luigiConfig = {
    navigation: {
      nodes: [
        {
          pathSegment: 'home',
          label: 'Home',
          icon: 'home',
          //context: userInfo,
          constraints: ['Employee', 'Manager'],
          viewUrl: 'openui5.html#/home',
          children: [
            {
              pathSegment: 'persondetails',
              label: 'Person Details',
              icon: 'employee',
              //context: userInfo,
              constraints: ['Employee', 'Manager'],
              viewUrl: 'persondetails/index.html'
            },
            {
              pathSegment: 'employees',
              label: 'My Team',
              icon: 'group',
              //context: userInfo,
              constraints: ['Manager'],
              viewUrl: 'employees/index.html'
            }
          ]
        }
      ]
    },
    routing: {
      useHashRouting: true
    },
    settings: {
      header: {
        title: 'Luigi, CAP, Azure, UI5',
        logo: '/logo.png',
        favicon: '/favicon.ico'
      },
      responsiveNavigation: 'semiCollapsible',
      appLoadingIndicator: {
        hideAutomatically: true
      }
    },
    lifecycleHooks: {
      // luigiAfterInit: async () => {
      //   const authData = Luigi.auth().store.getAuthData();
      //   console.log('authData=' + authData);
      //   if (authData) {
      //     const response = await fetch('/persons/userinfo()', {
      //       method: 'GET',
      //       headers: {
      //         Authorization: 'Bearer ' + authData.accessToken
      //       }
      //     });
      //     const userInfo = await response.json();
      //     getNavigationData(userInfo).then((response) => {
      //       resolveNavigation(response);
      //       Luigi.configChanged('navigation');
      //     });
      //   }
      // }
    }
  };

  Luigi.setConfig(luigiConfig);
})();
