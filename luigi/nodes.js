export function getNodes(userInfo) {
  return [
    {
      pathSegment: 'root',
      label: 'Home',
      context: userInfo,
      constraints: [0, 1, 2, 3, 4, 5],
      children: [
        {
          pathSegment: 'home',
          label: 'Vacation Planner',
          icon: 'home',
          viewUrl: '/home/',
          context: userInfo,
          constraints: [0, 1, 2, 3, 4, 5]
        },
        {
          pathSegment: 'personalDetails',
          label: 'Display personal details',
          icon: 'assets/Reply_Mono.png',
          viewUrl: '/personDetails/',
          context: userInfo,
          constraints: [0, 1, 2, 3, 4, 5]
        },
        {
          pathSegment: 'displayMyVacations',
          category: { label: 'Vacations', icon: 'calendar', collapsible: true },
          label: 'Display all my vacations',
          viewUrl: '/allMyVacations/',
          context: userInfo,
          constraints: [0, 1, 2, 3, 4, 5]
        },
        {
          pathSegment: 'createVacation',
          category: 'Vacations',
          label: 'Create a new vacation',
          viewUrl: '/creatingVacation/',
          context: userInfo,
          constraints: [0, 1, 2, 3, 4, 5]
        },
        {
          pathSegment: 'allEmployees',
          category: {
            label: 'Manager Functions',
            icon: 'person-placeholder',
            collapsible: true
          },
          label: 'Display all employees',
          viewUrl: '/allEmployees/',
          context: userInfo,
          constraints: [3, 4, 5]
        },
        {
          pathSegment: 'createPerson',
          category: 'Manager Functions',
          label: 'Create a new employee',
          viewUrl: '/creatingPersons/',
          context: userInfo,
          constraints: [3, 4, 5]
        },
        {
          pathSegment: 'changePerson',
          category: 'Manager Functions',
          label: 'Change personal data',
          viewUrl: '/changePerson/',
          context: userInfo,
          constraints: [3, 4, 5]
        },
        {
          pathSegment: 'displayEmployeeVacations',
          category: 'Manager Functions',
          label: 'Display all employee vacations',
          viewUrl: '/employeeVacations/',
          context: userInfo,
          constraints: [3, 4, 5]
        },
        {
          pathSegment: 'employeeVacationsResumee',
          category: 'Manager Functions',
          label: 'Resumee of all employee vacations',
          viewUrl: '/employeeVacationsResumee/',
          context: userInfo,
          constraints: [3, 4, 5]
        },
        {
          pathSegment: 'configBU',
          category: {
            label: 'Partner Functions',
            icon: 'user-settings',
            collapsible: true
          },
          label: 'Create BU',
          viewUrl: '/changeUnit/',
          context: userInfo,
          constraints: [5]
        },
        {
          pathSegment: 'configTeam',
          category: 'Partner Functions',
          label: 'Create Team',
          viewUrl: '/changeTeam/',
          context: userInfo,
          constraints: [5]
        },
        {
          pathSegment: 'resetYear',
          category: 'Partner Functions',
          label: 'Reset year',
          viewUrl: '/resetYear/',
          context: userInfo,
          constraints: [5]
        }
      ]
    }
  ];
}
