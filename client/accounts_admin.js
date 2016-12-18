var getUsers = function() {
  var configuredFields;
  var profileFilterCriteria;
  if (RolesTree) {
    var user = Meteor.user();
    var group;
    if (user && user.profile) {
      group = user.profile.organization;
    }
    configuredFields = RolesTree.getAllMyFieldsAsObject(Meteor.userId());
    profileFilterCriteria = RolesTree.copyProfileCriteriaFromUser(Meteor.user(),{}, group);

  }
  return filteredUserQuery(Meteor.userId(), Session.get("userFilter"), Session.get("userFilterCriteria"), configuredFields, undefined, profileFilterCriteria);

};

Template.accountsAdmin.helpers({
  users: function () {
    return getUsers();
  },
  showAddButton: function() {
    var user = Meteor.user();
    if (user && user.profile && user.profile.organization) {
      // get this user's roles for their default org
      var roles = Roles.getRolesForUser(user, user.profile.organization);
      if (roles) {
        return roles.includes("admin") || roles.includes("appAdmin");
      }

    }
  },
  email: function () {
    return getEmailAddress(this);
  },
  roles: function() {
    var retval = getRolePairs(this);
    console.log(retval);
    return retval;
  },
  profileName: function() {
    return getProfileName(this);
  },

  searchFilter: function () {
    return Session.get("userFilter");
  },

  myself: function (userId) {
    return Meteor.userId() === userId;
  }
});

// search no more than 2 times per second
var setUserFilter = _.throttle(function (template) {
  var search = template.find(".search-input-filter").value;
  Session.set("userFilter", search);
}, 500);

Template.accountsAdmin.events({
  'keyup .search-input-filter': function (event, template) {
    setUserFilter(template);
    return false;
  },

  'click .removebtn': function (event, template) {
    Session.set('userInScope', this);
    // $('#deleteaccount').openModal();
  },

  'click .infobtn': function (event, template) {
    Session.set('userInScope', this);
    // $('#infoaccount').openModal();
  },

  'click .editbtn': function (event, template) {
    Session.set('userInScope', this);
    // $('#updateaccount').openModal();
  },
  'click #updaterolesbtn': function(event, template) {
    // $('#updateroles').openModal();
  }
});

Template.accountsAdmin.onCreated(function () {
  this.subscribe('roles');
  this.autorun(function (computation) {
    Meteor.subscribe('filteredUsers', Session.get('userFilter'), Session.get('userFilterCriteria'), {
      'onReady': function () {},
      'onStop': function (error) {
        if (error) console.error(error);
      }
    });
  });
});

Template.accountsAdmin.onRendered(function () {
  var searchElement = document.getElementsByClassName('search-input-filter');
  if (!searchElement)
    return;
  var filterValue = Session.get("userFilter");

  var pos = 0;
  if (filterValue)
    pos = filterValue.length;

  searchElement[0].focus();
  searchElement[0].setSelectionRange(pos, pos);
});