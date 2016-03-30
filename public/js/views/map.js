define([
        'backbone.marionette'
    ],
    function(Marionette){
        'use strict';

        return Marionette.ItemView.extend({

            el: '#yandex-map',

            template: false,

            initialize: function() {
                console.log("initialize a Map View");
                var scope = this;
                ymaps.ready(function () {
                    scope.map = new ymaps.Map(scope.el, {
                        center: [55.76, 37.64],
                        zoom: 7
                    });
                });
            }
        });
    });