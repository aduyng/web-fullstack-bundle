define(function (require) {

    //require the layout
    var Layout = require('./layout');
    var Router = require('./router');

    var App = Backbone.Model.extend({

    });

    App.prototype.run = function () {
        var self = this;

        this.layout = new Layout({
            el: '#layout',
            app: this
        });

        this.layout.render();

        //request for the current user
        this.ajax({
            async: false,
            data: {
                package: 'user',
                method: 'current'
            }, success: function (resp) {
                self.user = new Backbone.Model(resp);
            }, error: function (jqXHR) {
                if (jqXHR.status === 404) {
                    jqXHR.status = 401;
                    self.trigger('api-error', jqXHR);
                }
                return false;
            }
        });



        //create router
        this.router = new Router({
            app: this
        });
        this.router.start();


    };

    App.prototype.ajax = function (options) {
        var self = this;

        if (!options.url) {
            options.url = this.apiBaseUrl;
        }

        if (!options.dataType) {
            options.dataType = 'jsonp';
        }
        var oldErrorCallback = options.error || function () {
        };
        options.error = function (jqXHR) {
            if (oldErrorCallback(jqXHR) !== false) {
                self.trigger('api-error', jqXHR, options);
            }
        };

        return $.ajax(options);
    };

    Object.defineProperty(App.prototype, 'baseUrl', {
        get: function () {
            return this.get('baseUrl');
        }
    });

    Object.defineProperty(App.prototype, 'apiBaseUrl', {
        get: function () {
            return this.get('apiBaseUrl');
        }
    });

    Object.defineProperty(App.prototype, 'router', {
        get: function () {
            return this.get('router');
        },
        set: function (val) {
            this.set('router', val);
        }
    });

    Object.defineProperty(App.prototype, 'layout', {
        get: function () {
            return this.get('layout');
        },
        set: function (val) {
            this.set('layout', val);
        }
    });

    Object.defineProperty(App.prototype, 'user', {
        get: function () {
            return this.get('user');
        },
        set: function (val) {
            this.set('user', val);
        }
    });


    return App;
});