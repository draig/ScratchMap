require([
        'backbone',
        'backbone.marionette'
    ],
    function (Backbone, Marionette) {
        'use strict';

        var Router = Marionette.AppRouter({
            appRoutes: {
                'blog/': 'blogList',
                'blog/:entry': 'blogEntry'
            },

            /** Initialize our controller with the options passed into the application,
             such as the initial posts list.
             */
            initialize: function () {
                this.controller = new Controller({
                    initialData: this.getOption('initialData')
                });
            }
        });

        return Router;
    }
);
