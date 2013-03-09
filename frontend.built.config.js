/**
 * BUILD REQUIREMENT
 *      - nodejs installed
 *      - requirejs install (npm install -g requirejs)
 *      - less installed (npm install -g less)
 *STEPS
 *      1. Change to root directory where frontend is a child of
 *          cd <faq root>
 *      2. Compile js
 *          r.js -o frontend.built.config.js
 *      3. Compile less
 *          lessc --yui-compress frontend-built/index.less > frontend-built/index.css
 *      4. Make changes on frontend/index.html
 *          - remove the inclusion of less
 *          - change stylesheet link to index.css
 *              <link rel="stylesheet/less" type="text/css" href="index.less" />
 *           to
 *              <link rel="stylesheet" type="text/css" href="index.css" />

 */

({
    appDir:"./frontend",
    baseUrl:"./",
    dir:"./frontend-built",
    modules:[
        {
            name:"app/pages/faq/index"
        },
        {
            name:"app/pages/index/index"
        },
        {
            name:"app/pages/index/sign-out"
        },
        {
            name:"app/pages/ticket/index"
        },
        {
            name:"index"
        },
        {
            name:"app/components/dialog/login"
        },
        {
            name:"app/app"
        },
        {
            name:"app/layout"
        },
        {
            name:"app/router"
        }
    ],
    paths:{
        jquery:'empty:',
        underscore:'underscore/underscore',
        backbone:'backbone/backbone',
        bootstrap:'bootstrap/bootstrap',
        text:'requirejs/plugins/text'
    }
})