require.config({
    paths: {
        'jquery': 'js/thirdparty/jquery',
        'underscore': 'js/thirdparty/underscore',
        'backbone': 'js/thirdparty/backbone',
        'backbone.babysitter': 'js/thirdparty/backbone.babysitter/lib/backbone.babysitter.js',
        'backbone.wreqr': 'js/thirdparty//backbone.wreqr/lib/backbone.wreqr.js',
        'backbone.marionette': 'js/thirdparty//backbone.marionette/lib/core/backbone.marionette.js'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            exports: 'Backbone',
            deps: ['jquery', 'underscore']
        },
        marionette: {
            exports: 'Backbone.Marionette',
            deps: ['backbone']
        }
    },
    deps: ['jquery', 'underscore', 'main']
});

