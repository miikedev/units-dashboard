const routesMap = [
    {url: '/dashboard', name: 'Dashboard'},
    {url: '/dashboard/units', name: 'Units'},
    {url: '/dashboard/positions', name: 'Positions'},
    {url: '/dashboard/positions/create', name: 'Create Position'},
    {url: '/dashboard/positions/edit', name: 'Edit Position'},
    {url: '/dashboard/units/create', name: 'Create Unit'},
    {url: '/dashboard/units/edit', name: 'Edit Unit'},
    {url: '/dashboard/positions/create', name: 'Create Position'}
  ]
export const currentTabName = (pathname) => {  
    // Check for exact matches or dynamic routes  
    const filteredRoute = routesMap.find(route => {  
      // Check for exact match  
      if (route.url === pathname) {  
        return true;  
      }  
      // Check if the route is an edit route with a dynamic ID  
      const editRoutePattern = /^\/dashboard\/units\/edit\/\d+$/; // Adjust the regex as needed for your ID format  
      return editRoutePattern.test(pathname);  
    });  
  
    // If a matching route is found, return its name; otherwise, return a default or undefined  
    return filteredRoute ? filteredRoute.name : undefined;  
  }  