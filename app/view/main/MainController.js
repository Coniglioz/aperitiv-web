Ext.define('Aperitiv.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    routes: {
        'login': {
            action: 'onLogin'
        },
        'aperitiv': {
            action: 'onList'
        }
    },

    listen: {
        global: {
            beforeroute: 'onBeforeRoute'
        }
    },

    onBeforeRoute: function (action, route) {
        var user = this.getViewModel().get('jwtPayload');
        if (route.getName() !== 'login' && !user) {
            this.redirectTo('login');
            action.stop();
        }
    },

    onLogin: function () {
        Ext.suspendLayouts();
        Ext.Viewport.removeAll(true, true);
        Ext.Viewport.add({
            xtype: 'login'
        });
        Ext.resumeLayouts(true);
    },

    onList: function () {
        console.log('list');
    }
});