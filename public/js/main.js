require([
        'backbone',
        'application',
        'router'
    ],
    function (Backbone, App, Router) {
        'use strict';

        App.router = new Router({});

        App.start();

        Backbone.history.start({
            root: '/'
        });
    });
