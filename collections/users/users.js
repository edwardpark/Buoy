Meteor.users.allow({
  insert: () => allow,
  update: () => allow,
  remove: () => allow
});

let Schema = {};

// This is the schema for the basic user collection
Schema.User = new SimpleSchema({
  "userId": {
    type: String,
    label: "The ID of the owner of this document."
  },
  username: {
    type: String,
    // For accounts-password, either emails or username is required, but not both. It is OK to make this
    // optional here because the accounts-password package does its own validation.
    // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
    optional: true
  },
  emails: {
    type: Array,
    // For accounts-password, either emails or username is required, but not both. It is OK to make this
    // optional here because the accounts-password package does its own validation.
    // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
    optional: true
  },
  "emails.$": {
    type: Object
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean
  },
  // Here we add the schema for the additional informations
  "profile": {
    type: Schema.UserProfile,
    optional: true
  },
  "preferences": {
    type: Object
  },
  createdAt: {
    type: Date
  },
  // Make sure this services field is in your schema if you're using any of the accounts packages
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  heartbeat: {
    type: Date,
    optional: true
  }
});

// Additional user informations
Schema.UserProfile = {
  "firstName": {
    type: String,
    optional: true
  },
  "lastName": {
    type: String,
    optional: true
  },
  "fullName": {
    type: String,
    optional: true,
    autoValue: function() {
      let firstName = this.siblingField("firstName"),
      lastName = this.siblingField("lastName");
      return firstName + ' ' + lastName;
    }
  },
  "biography": {
    type: String
  }
};

Meteor.users.attachSchema(Schema.User);
