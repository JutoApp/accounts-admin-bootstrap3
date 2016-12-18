SimpleSchema.messages({
  "passwordMismatch": "Passwords do not match"
});

userSchema = new SimpleSchema({
  profile: {
    type: Object
  },
  'profile.firstname': {
    type: String,
    label: 'First Name',
    min: 2
  },
  'profile.lastname': {
    type: String,
    label: 'Last Name',
    min: 2
  },
  'profile.organization': {
    type: String,
    label: 'Organization',
    optional: true,
    min: 2,
    autoform: {
      omit: true
    }
  },
  'profile.address1': {
    type: String,
    label: 'Address Line 1',
    optional: true,
    min: 2,
    autoform: {
      omit: true
    }

  },
  'profile.address2': {
    type: String,
    label: 'Address Line 2',
    optional: true,
    min: 2,
    autoform: {
      omit: true
    }
  },
  'profile.phoneNumber': {
    type: String,
    regEx: SimpleSchema.RegEx.Phone,
    label: 'Phone Number',
    optional: true,
  },
  'emailAddress': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: 'E-mail Address'
  },
  password: {
    type: String,
    label: "Enter a password",
    min: 8,
    autoform: {
      afFieldInput: { type: "password" }
    }
  },
  confirmPassword: {
    type: String,
    label: "Enter the password again",
    min: 8,
    custom: function () {
      if (this.value !== this.field('password').value) {
        return "passwordMismatch";
      }
    },
    autoform: {
      afFieldInput: { type: "password" }
    }

  }
});
