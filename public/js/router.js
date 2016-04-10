define([
        'backbone',
        'backbone.marionette',
        'application',
        'views/map',
        'views/login'
    ],
    function (Backbone, Marionette, App, Map, Login) {
        'use strict';

        var Router = Marionette.AppRouter.extend({
            appRoutes: {
                'login': 'login',
                '': 'home'
            },

            controller: {
                login: function () {
                    console.log("relocate to login");
                    App.contentRegion.empty();
                    App.contentRegion.show(new Login());//
                    //Communicator.mediator.trigger("redirect:login");
                },
                home: function () {
                    console.log("relocate to home");
                    App.contentRegion.show(new Map());//
                }
            },

            /** Initialize our controller with the options passed into the application,
             such as the initial posts list.
             */
            initialize: function () {
                console.log("initialize a Router");
            }
        });

        return Router;
    }
);
