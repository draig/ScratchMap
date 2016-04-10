define([
        'backbone.marionette',
        'text!../../tmpl/login.html'
    ],
    function(Marionette, loginTmpl){
        'use strict';

        return Marionette.ItemView.extend({

            tagName: 'form',

            template: _.template(loginTmpl),

            onRender: function(){
                this.$el.addClass("form-signin");
            },

            initialize: function() {
                console.log("initialize a Login View");
            }
        });
    });