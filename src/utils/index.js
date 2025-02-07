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

export const groupByLevel = (data, level) => { 
  console.log('data', data); 
  if(data == undefined) return;
  return data.reduce((acc, item) => {  
    const stateName = item?.state?.name;  
    const districtName = item?.district?.name;  
    const townshipName = item?.township ? item?.township?.name : null; // township may not exist for state/district level  
    const position = {  
      _id: item?.position._id,  
      name: item?.position.name,  
      level: item?.position.level,  
      status: item.status,

    };  

    // Determine the grouping key based on the level  
    let groupKey;  
    if (level === "state") {  
      if (position.level === "state") {  
        groupKey = stateName;  
      }  
    } else if (level === "district") {  
      if (position.level === "district") {  
        groupKey = `${stateName}|${districtName}`;  
      }  
    } else if (level === "township") {  
      if (position.level === "district" || position.level === "township") {  
        groupKey = `${stateName}|${districtName}|${townshipName}`;  
      }  
    }  

    // Only proceed if a valid groupKey was generated  
    if (groupKey) {  
      const existingGroup = acc.find(g => {  
        if (level === "state") {  
          return g.state.state === groupKey;  
        } else if (level === "district") {  
          return g.district.state === stateName && g.district.district === districtName;  
        } else if (level === "township") {  
          return g.township.state === stateName && g.township.district === districtName && g.township.township === townshipName;  
        }  
      });  

      if (existingGroup) {  
        existingGroup.positions.push(position);  
      } else {  
        const newGroup = {};  
        if (level === "state") {  
          newGroup.state = { state: stateName };  
        } else if (level === "district") {  
          newGroup.district = { state: stateName, district: districtName };  
        } else if (level === "township") {  
          newGroup.township = { state: stateName, district: districtName, township: townshipName };  
        }  
        newGroup.positions = [position];  
        acc.push(newGroup);  
      }  
    }  

    return acc;  
  }, []);  
}; 