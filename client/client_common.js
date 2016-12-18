
getEmailAddress = function getEmailAddress(context){
  if (context.emails && context.emails.length)
    return context.emails[0].address;

  if (context.services) {
    //Iterate through services
    for (var serviceName in context.services) {
      var serviceObject = context.services[serviceName];
      //If an 'id' isset then assume valid service
      if (serviceObject.id) {
        if (serviceObject.email) {
          return serviceObject.email;
        }
      }
    }
  }
  return "";

};

getProfileName = function getProfileName(context) {
  console.log(context.profile);
  if (context.profile) {
    if (context.profile.name) {
      return context.profile.name;
    } else if (context.profile.firstname) {
      return `${context.profile.firstname} ${context.profile.lastname}`;
    }
  }
  return getEmailAddress(context);

};

getRolePairs = function getRolePairs(context) {
  var userGroups = Roles.getGroupsForUser(context._id);
  var rolePairs = [];

  _.each(userGroups, (group) => {
    // get the roles for context user for context group

    var rolesForGroup = Roles.getRolesForUser(context._id, group);
    var obj = {key: group, value: rolesForGroup.join(",")};
    rolePairs.push(obj);


  }, context);
  console.log(rolePairs);
  return rolePairs;
};