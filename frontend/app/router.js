define(function (require) {

    var Router = Backbone.Router.extend({
        routes: {
            "*action": 'defaultAction'
        }
    });
    Router.prototype.initialize = function(options){
        Backbone.Router.prototype.initialize.call(this, options);

        this.app = options.app || console.error("app must be passed!");
    };

    Router.prototype.defaultAction = function (url) {
        var self = this;

        if( self.app.page ){
            //clean up
            self.app.page.undelegateEvents();
            self.app.page.$el.html('<i class="icon-spin icon-spinner"></i> Loading...');

            //trigger an event
            self.app.trigger('page-closed');
        }

        //split the url to controller/action
        var parts = url.split('/');
        var controller = parts[0] || 'index';
        var action = parts[1] || 'index';
        var params = {};
        if (parts.length > 2) {
            var i;

            for (i = 2; i < parts.length; i += 2) {
                params[parts[i]] = parts[i + 1];
            }
        }

        //loading page
        var pagePath = self.app.baseUrl + 'pages/' + controller + '/' + action;
        require([pagePath], function(Page){
            self.app.page = new Page({
                el: self.app.layout.mainPanel,
                app: self.app
            });

            self.app.page.render();
            self.app.trigger('page-rendered', self.app.page);
        });
    };

    Router.prototype.start = function () {
        Backbone.history.start();
    };


    return Router;
});