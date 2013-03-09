define(function (require) {
    var Page = Backbone.View.extend({

    });
    Page.prototype.initialize = function (options) {
        //super(options)
        Backbone.View.prototype.initialize.call(this, options);


    };

    Page.prototype.render = function () {
        //shoot a request to server for sign out

        app.ajax({
            data: {
                package: 'user',
                method: 'sign-out'
            }, success: function (resp) {
                app.router.navigate('#', {trigger: false, replace: true});
                toastr.success("You have successfully signed out!");
                window.location.reload();
            }
        });
    };


    return Page;


});