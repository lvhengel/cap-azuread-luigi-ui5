import { auth } from './auth';

Luigi.setConfig({
  auth: auth,
  navigation: {
    contextSwitcher: false,
    nodes: () => [
      {
        pathSegment: 'home',
        label: 'Home',
        icon: 'home',
        viewUrl: 'openui5.html#/home',
        children: [
          {
            pathSegment: 'persondetails',
            label: 'Person Details',
            icon: 'nutrition-activity',
            viewUrl: 'persondetails/index.html'
          },
          {
            pathSegment: 'employees',
            label: 'My Team',
            icon: 'paper-plane',
            viewUrl: 'employees/index.html'
          }
        ]
      }
    ]
  },
  routing: {
    /**
     * Development:
     * For path routing, set to false
     * For hash routing, set to true
     */
    useHashRouting: true
  },
  settings: {
    header: {
      title: 'Luigi, CAP, Azure, UI5',
      logo: '/logo.png',
      favicon: '/favicon.ico'
    },
    responsiveNavigation: 'simpleMobileOnly',
    // appLoadingIndicator: {
    //   hideAutomatically: false
    // },
    loadingIndicator: {
      enabled: false
    }
  }
});
