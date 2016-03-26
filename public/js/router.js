define([
        'backbone',
        'backbone.marionette'
    ],
    function (Backbone, Marionette) {
        'use strict';

        var Router = Marionette.AppRouter.extend({
            appRoutes: {
                'login': 'login',
                '': 'home'
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
