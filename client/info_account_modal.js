Template.infoAccountModalInner.helpers({
  email: function () {
    return getEmailAddress(this);
  },
  profileName: function() {
    return getProfileName(this);
  },

  userInScope: function () {
    return Session.get('userInScope');
  },

  roles: function() {
    return getRolePairs(this);
  },

});

Template.infoAccountModalInner.events({
  'click .modal-close': function (event, template) {
    $('#infoaccount').closeModal();
  }
});
