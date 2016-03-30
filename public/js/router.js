define([
        'backbone',
        'backbone.marionette',
        'application',
        'views/map'
    ],
    function (Backbone, Marionette, App, Map) {
        'use strict';

        var Router = Marionette.AppRouter.extend({
            appRoutes: {
                'login': 'login',
                '': 'home'
            },

            controller: {
                login: function () {
                    console.log("relocate to login");
                    //Communicator.mediator.trigger("redirect:login");
                },
                home: function () {
                    console.log("relocate to home");
                    App.mainRegion.show(new Map());
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
