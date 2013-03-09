requirejs.config({
    baseUrl: './',
    paths: {
        underscore: 'underscore/underscore',
        backbone: 'backbone/backbone',
        bootstrap: 'bootstrap/bootstrap',
        text: 'requirejs/plugins/text'
    },
    shim: {
        backbone: {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        }
    }
});


require(['jquery',  'underscore', 'backbone', 'bootstrap','toastr/toastr'], function ($, _, Backbone, TwitterBoostrap, Toastr) {
    require(['app/app'], function (Bootstrap) {
        window.app = new Bootstrap({
            baseUrl: 'app/',
            apiBaseUrl: 'http://localhost:8888/faq/backend/'
        });
        window.app.run();

    });
});