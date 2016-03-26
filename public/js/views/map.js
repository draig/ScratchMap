define([
        'backbone'
    ],
    function(Backbone){
        'use strict';

        return Backbone.View.extend({
            el: 'yandex-map',

            initialize: function() {
                console.log("initialize a Map View");
                var scope = this;
                ymaps.ready(function () {
                    scope.map = new ymaps.Map("yandex-map", {
                        center: [55.76, 37.64],
                        zoom: 7
                    });
                });
            }
        });
    });