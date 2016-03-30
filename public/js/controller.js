define([
        'backbone.marionette',
        'communicator',
        'views/map'
    ],
    function (Marionette, Communicator, MapView) {
        'use strict';

        var Controller = Marionette.Object.extend({
            initialize: function() {
                console.log("initialize a Controller");
                /** The region manager gives us a consistent UI and event triggers across
                 our different layouts.
                 */
//                this.options.regionManager = new Marionette.RegionManager({
//                    regions: {
//                        header: '#th-header',
//                        sidePanel: '#th-side-panel',
//                        mainPanel: '#th-main-panel',
//                        footer: '#th-footer'
//                    }
//                });
//                var initialData = this.getOption('initialData');
//
//                var layout = new LayoutView({
//                    collection: new BlogList(initialData.posts)
//                });
//
//                this.getOption('regionManager').get('main').show(layout);

                /** We want easy access to our root view later */
//                this.options.layout = layout;
            },

            login: function () {
                console.log("relocate to login");
                Communicator.mediator.trigger("redirect:login");
            },
            home: function () {
                console.log("relocate to home");
                Communicator.mediator.trigger("redirect:home");
            }

            /** List all blog entrys with a summary */
           /* blogList: function() {
                var layout = this.getOption('layout');
                layout.triggerMethod('show:blog:list');
            },*/

            /** List a named entry with its comments underneath */
            /*blogEntry: function(entry) {
                var layout = this.getOption('layout');
                layout.triggerMethod('show:blog:entry', entry);
            }*/
        });

        return Controller;
    }
);
