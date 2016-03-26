require.config({
    paths: {
        'jquery': 'thirdparty/jquery/dist/jquery',
        'underscore': 'thirdparty/underscore/underscore',
        'backbone': 'thirdparty/backbone/backbone',
        'backbone.babysitter': 'thirdparty/backbone.babysitter/lib/backbone.babysitter',
        'backbone.wreqr': 'thirdparty//backbone.wreqr/lib/backbone.wreqr',
        'backbone.marionette': 'thirdparty//backbone.marionette/lib/core/backbone.marionette'
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

