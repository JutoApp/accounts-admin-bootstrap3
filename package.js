Package.describe({
	summary: "Comprehensive user management for bootstrap.",
  git: 'https://github.com/AppWorkshop/meteor-accounts-admin-materializecss',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md',
  version: "1.0.0",
  name: "juto:accounts-admin-bootstrap3"
});

Package.on_use(function (api, where) {
	api.use([
			"alanning:roles@1.2.15",
			'coffeescript',
			'templating',
			'check',
			'underscore',
			'logging',
			'softwarerero:accounts-t9n@1.1.4',
			'aldeed:simple-schema',
			'aldeed:autoform'
		],
		['client',
			'server']);
	api.imply(['chrismbeckett:toastr'],'client');
	api.use(['session'],['client']);

  var path = Npm.require('path');
  api.add_files(path.join('libs','t9n','en.coffee'), 'client');
  api.add_files(path.join('libs','t9n','id.coffee'), 'client');
  api.add_files('client/client_common.js', ['client']);
  api.add_files('libs/schema.js', ['client', 'server']);
  api.add_files('libs/role_hierarchy.js', ['client', 'server']);
	api.add_files('libs/user_query.js', ['client', 'server']);
	api.add_files('client/accountsAdminModalInclude.html',['client']);
  api.add_files('client/roles_hierarchy_helpers.js', 'client');
  api.add_files('client/addUser.html', 'client');
  api.add_files('client/addUser.js', 'client');
	api.add_files('client/accounts_admin.html', 'client');
	api.add_files('client/accounts_admin.js', 'client');
	api.add_files('client/delete_account_modal.html', 'client');
	api.add_files('client/delete_account_modal.js', 'client');
	api.add_files('client/info_account_modal.html', 'client');
	api.add_files('client/info_account_modal.js', 'client');
	api.add_files('client/update_account_modal.html', 'client');
	api.add_files('client/update_account_modal.js', 'client');
	api.add_files('client/update_roles_modal.html', 'client');
	api.add_files('client/update_roles_modal.js', 'client');

	api.add_files('style/style.css', 'client');

	api.add_files('server/startup.js', 'server');
	api.add_files('server/publish.js', 'server');
	api.add_files('server/methods.js', 'server');
  api.export('RolesTree', ['client', 'server']);
});
