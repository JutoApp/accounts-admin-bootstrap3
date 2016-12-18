var toast = function toast(type, message) {
  if (typeof JutoGlobalUtils !== "undefined") {
    JutoGlobalUtils.toast('info', '', message);
  } else {
    toastr[type](message, '');
  }

};


Template.adduserModalInner.helpers({
  'userSchema': () => {
    return userSchema;
  }
});

Template.adduserModalInner.onCreated(() => {
  AutoForm.hooks({
    accountsAddUser: {

      onSubmit: function (insertDoc, updateDoc, currentDoc) {

        if (AutoForm.validateForm("accountsAddUser")) {
          var self = this;
          var modalElem = $("#adduser");
          var formElem = $("#accountsAddUser");

          Meteor.call('adminAccountsCreateUser', insertDoc, false, function (error) {
            if (error) {
              toast("error",error.reason);
              console.error(error);
              self.done(error);
            } else {
              toast('info', "User: " + insertDoc.emailAddress + " created.");
              modalElem.modal('hide');
              //Blank input values/reset validity
              formElem[0].reset();
              self.done();
            }
          });
        }
        // You must call this.done()!
        //this.done(); // submitted successfully, call onSuccess
        //this.done(new Error('foo')); // failed to submit, call onError with the provided error
        //this.done(null, "foo"); // submitted successfully, call onSuccess with `result` arg set to "foo"
        return false;
      },

      // Called when any submit operation succeeds
      onSuccess: function (formType, result) {
        toast('success', 'user added');

      },

      // Called when any submit operation fails
      onError: function (formType, error) {
        console.log('onError:');
        console.log(this.validationContext);
        console.log(formType);
        console.error(error);
        toast('error', error);
      },


    }
  });
});

// add user modal
Template.adduserModalInner.events({});