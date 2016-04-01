define([
        'backbone.marionette',
        'text!../../tmpl/login.html'
    ],
    function(Marionette, loginTmpl){
        'use strict';

        return Marionette.ItemView.extend({

            el: '#yandex-map',

            template: _.template(loginTmpl),

            initialize: function() {
                console.log("initialize a Login View");
                this.$el.hide()
            }
        });
    });