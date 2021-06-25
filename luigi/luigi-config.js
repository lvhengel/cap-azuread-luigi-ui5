
(async () => {
  const luigiConfig = {
    navigation: {
      nodes: [
        {
          pathSegment: 'home',
          label: 'Home',
          icon: 'home',
          viewUrl: 'openui5.html#/home',
          children: [
            {
              pathSegment: 'persondetails',
              label: 'Person Details',
              icon: 'employee',
              viewUrl: 'persondetails/index.html'
            },
            {
              pathSegment: 'employees',
              label: 'My Team',
              icon: 'group',
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
    }
  };

  Luigi.setConfig(luigiConfig);
})();
