export function getNodes(userInfo) {
  return [
    {
      pathSegment: 'home',
      label: 'Home',
      icon: 'home',
      context: userInfo,
      constraints: ['Employee', 'Manager'],
      viewUrl: 'openui5.html#/home',
      children: [
        {
          pathSegment: 'persondetails',
          label: 'Person Details',
          icon: 'employee',
          context: userInfo,
          constraints: ['Employee', 'Manager'],
          viewUrl: 'persondetails/index.html'
        },
        {
          pathSegment: 'employees',
          label: 'My Team',
          icon: 'group',
          context: userInfo,
          constraints: ['Manager'],
          viewUrl: 'employees/index.html'
        }
      ]
    }
  ];
}
