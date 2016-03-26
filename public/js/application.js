define([
	'backbone',
    'router',
	'communicator',
    'controller'
],
function(Backbone, Router, Communicator, Controller) {
    'use strict';

	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
    App.addRegions({
        headerRegion: "#header-region",
        mapRegion: "#map-region"
    });

    App.router = new Router({
        controller: new Controller()
    });

    /* Add initializers here */
	App.addInitializer( function () {
        Backbone.history.start();
        console.log("initialize a Application");
		/*document.body.innerHTML = welcomeTmpl({ success: "CONGRATS!" });
		Communicator.mediator.trigger("APP:START");*/
	});

    App.on("initialize:after", function(){

//        // Creating a generic ItemView for Header
//        headerView = new HeaderView();
//
//        // Add Header View to region to be render
//        MyApp.headerRegion.show(headerView);
//
//        // Creating a generic ItemView for Footer
//        footerView = new FooterView();
//
//        // Add Header View to region to be render
//        MyApp.footerRegion.show(footerView);
//
//        // Create  Form view
//        formView = new FormView({
//            vent: MyApp.vent,
//        });
//
//        // Add Form to render to main region and avoid be replaced
//        MyApp.toolbarRegion.show(formView);
//
//        MyApp.vent.on("myapp:buddy", function(buddy){
//            MyApp.router.navigate('#hello/' + buddy, {trigger: true});
//        });
//
//        // Start Backbone history a necessary step for bookmarkable URL's
//        Backbone.history.start();
    });

	return App;
});
