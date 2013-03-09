define(function (require) {
    var Template = require('text!./login.html');

    var View = Backbone.View.extend({
        className: 'modal hide fade',
        events: {
            'click #submit': 'submitClickHandler'
        }
    });
    View.prototype.initialize = function (options) {
        //super(options)
        Backbone.View.prototype.initialize.call(this, options);
    };

    View.prototype.open = function () {
        this.$el.html(Template);
        this.$el.appendTo($('body'));
        this.$el.modal({
            keyboard: false,
            show: true,
            backdrop: 'static'
        });
    };

    View.prototype.submitClickHandler = function (event) {
        event.stopPropagation();
        event.preventDefault();

        //validate email and password
        var email = $.trim(this.$el.find('#email').val());
        if (email.length === 0) {
            toastr.error("Email is required!");
            return false;
        }

        var password = $.trim(this.$el.find('#password').val());
        if (password.length === 0) {
            toastr.error("Password is required!");
            return false;
        }

        app.ajax({
            data: {
                package: 'user',
                method: 'sign-in',
                email: email,
                password: password
            },
            success: function (resp) {
                window.location.reload();
                toastr.success("You have successfully logged in!");
            },
            error: function(jqXHR){
                toastr.error(jqXHR.responseText||"Incorrect email or password!");
                return false;
            }
        });

    };

    return View;
});