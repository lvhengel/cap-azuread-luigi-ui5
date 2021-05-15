import { auth } from './auth';

import { navigation, getNavigationData, resolveNavigation } from './navigation';

(async () => {
  const luigiConfig = {
    auth,
    navigation,
    routing: {
      useHashRouting: true
    },
    settings: {
      appLoadingIndicator: {
        hideAutomatically: true
      },
      responsiveNavigation: 'semiCollapsible',
      header: {
        logo: 'assets/Reply.png',
        title: 'Vacation Planner 2.0',
        favicon: 'assets/Reply.png'
      },
      customSandboxRules: ['allow-top-navigation'],
      customTranslationImplementation: () => {
        return {
          getTranslation: (key) => {
            var request;
            var JSONObject;

            if (navigator.language.includes('de')) {
              request = new XMLHttpRequest();
              request.open(
                'GET',
                'assets/LuigiTranslations/strings_de.json',
                false
              );
              request.send(null);
              JSONObject = JSON.parse(request.responseText);
            } else {
              request = new XMLHttpRequest();
              request.open(
                'GET',
                'assets/LuigiTranslations/strings.json',
                false
              );
              request.send(null);
              JSONObject = JSON.parse(request.responseText);
            }

            switch (key) {
              case 'Home':
                return JSONObject.Home;
              case 'Vacation Planner':
                return JSONObject.VP;
              case 'Vacation Planner 2.0':
                return JSONObject.VP20;
              case 'Display personal details':
                return JSONObject.persDetails;
              case 'Vacations':
                return JSONObject.Vacations;
              case 'Display all my vacations':
                return JSONObject.allVacs;
              case 'Create a new vacation':
                return JSONObject.newVac;
              case 'Manager Functions':
                return JSONObject.ManagerOptions;
              case 'Display all employees':
                return JSONObject.dispAllEmployees;
              case 'Create a new employee':
                return JSONObject.newEmployee;
              case 'Change the information of an employee':
                return JSONObject.changeEmployee;
              case 'Display all employee vacations':
                return JSONObject.employeeVacations;
              case 'Resumee of all employee vacations':
                return JSONObject.resumee;
              case 'Change personal data':
                return JSONObject.changePerson;
              case 'Partner Functions':
                return JSONObject.config;
              case 'Create BU':
                return JSONObject.CreateBU;
              case 'Create Team':
                return JSONObject.CreateTeam;
              case 'Reset year':
                return JSONObject.resetYear;
              case 'Sign Out':
                return JSONObject.Signout;
            }
          }
        };
      }
    },
    lifecycleHooks: {
      luigiAfterInit: async () => {
        const authData = Luigi.auth().store.getAuthData();

        if (authData) {
          const response = await fetch('/resource/userinfo()', {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + authData.accessToken
            }
          });
          const userInfo = await response.json();
          
          getNavigationData(userInfo).then((response) => {
            resolveNavigation(response);
            Luigi.configChanged('navigation');
          });
        }
      }
    }
  };
  Luigi.setConfig(luigiConfig);
})();
