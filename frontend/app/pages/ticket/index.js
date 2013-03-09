define(function(require){
    var Template = require('text!./index.html');
    var Page = Backbone.View.extend({


    });
    Page.prototype.initialize = function(options){
        //super(options)
        Backbone.View.prototype.initialize.call(this, options);
    };

    Page.prototype.render = function(){
        //draw the sidebar first
        this.drawSidebar();
        this.$el.html(Template);

    };

    Page.prototype.drawSidebar = function(){
        var html = _.template(
            '<ul class="nav nav-list">' +
                '<li class="nav-header">Help &amp; Support</li>' +
                '<li ><a href="#"><i class="icon-home"></i> Home</a></li>' +
                '<li class="divider"></li>' +
                '<li><a href="<%=faqHref%>"><i class="icon-question-sign"></i> FAQs</a></li>' +
                '<li class="active"><a href="<%=ticketHref%>"><i class="icon-tasks"></i> <%=ticketLabel%></a></li>' +
                '<li class="divider"></li>' +
                '<li><a href="#index/sign-out"><i class="icon-signout"></i> Sign Out</a></li>' +
                '</ul>', {
                faqHref: app.user.get('isSupporter') ? '#faq/manage' : '#faq/index',
                ticketHref: app.user.get('isSupporter') ? '#ticket/manage' : '#ticket/index',
                ticketLabel: app.user.get('isSupporter') ? 'Tickets' : 'Your tickets'
            });
        app.layout.sidebar.html(html);
    };

    return Page;


});