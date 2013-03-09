define(function (require) {
    //load the layout
    var Template = require("text!./layout.html");

    var Layout = Backbone.View.extend({

    });

    Layout.prototype.initialize = function (options) {
        Backbone.View.prototype.initialize.call(this, options);

        if (!options.app) {
            throw new Error("app must be passed!");
        }

        this.app = options.app;
    };

    Layout.prototype.render = function () {
        var self = this;
        this.$el.html(Template);

        this.sidebar = this.$el.find('.sidebar');
        this.mainPanel = this.$el.find('.main-panel');

        //listen to api error
        this.app.on('api-error', function (jqXHR) {
            //unauthorized, show the login dialog
            if (jqXHR.status === 401) {
                require(['./components/dialog/login'], function (Dialog) {
                    var dialog = new Dialog({
                    });
                    dialog.open();
                });
            }
        }, this);

        this.trigger('drawed', this);

        //adjust to fit in window size
        var resize = function(){
            var height = $(window).height();
            self.sidebar.height(height);
            self.mainPanel.height(height);
        };
        resize();


        var lazyResize = _.debounce(resize, 300);
        $(window).resize(lazyResize);
    };
    return Layout;
});