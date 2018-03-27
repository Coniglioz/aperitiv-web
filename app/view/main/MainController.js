Ext.define('Aperitiv.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    routes: {
        'login': {
            action: 'onLogin'
        },
        'info': {
            action: 'onInfo'
        },
        'aperitiv': {
            action: 'onHome'
        },
        'aperitiv/:page': {
            action: 'onHome'
        },
        'aperitiv/:page/:section': {
            action: 'onHome'
        }
    },

    listen: {
        global: {
            beforeroute: 'onBeforeRoute'
        }
    },

    onBeforeRoute: function (action, route) {
        if (this.skipRoute) {
            this.skipRoute = false;
            return false;
        }

        let user = this.getViewModel().get('jwtPayload');
        if (route.getName() !== 'login') {
            if (!user) {
                this.internalRedirect('login');
                action.stop();
            } else if (!user.name && route.getName() !== 'info') {
                this.internalRedirect('info');
                action.stop();
            }
        } else {
            if (user) {
                this.internalRedirect(user.name ? 'aperitiv' : 'info');
                action.stop();
            }
        }
    },

    onLogin: function () {
        Ext.suspendLayouts();
        this.getView().removeAll(true, true);
        this.getView().add({
            xtype: 'login'
        });
        Ext.resumeLayouts(true);
    },

    onInfo: function () {
        Ext.suspendLayouts();
        this.getView().removeAll(true, true);
        this.getView().add({
            xtype: 'logininfo'
        });
        Ext.resumeLayouts(true);
    },

    onHome: function (page, section) {
        let aperitivView = this.lookupReference('aperitiv');

        Ext.suspendLayouts();
        if (!aperitivView) {
            this.getView().removeAll(true, true);
            aperitivView = this.getView().add({
                xtype: 'aperitiv'
            });
        }

        switch (page) {
            case 'create':
                aperitivView.setActiveItem(1);
                let createView = aperitivView.down('aperitivcreate');
                switch (section) {
                    case 'when':
                        createView.setActiveItem(1);
                        aperitivView.setTitle(Translations.localize('{create.when.title}'));
                        break;
                    case 'who':
                        createView.setActiveItem(2);
                        aperitivView.setTitle(Translations.localize('{create.who.title}'));
                        break;
                    case 'where':
                    default:
                        createView.setActiveItem(0);
                        aperitivView.setTitle(Translations.localize('{create.where.title}'));
                        break;
                }
                break;
            case 'list':
            default:
                aperitivView.setActiveItem(0);
                aperitivView.setTitle(Translations.localize('{title}'));
                break;
        }
        Ext.resumeLayouts(true);
    },

    internalRedirect: function (pkg, page, section) {
        switch (pkg) {
            case 'login':
                this.onLogin();
                break;
            case 'info':
                this.onInfo();
                break;
            case 'aperitiv':
                this.onHome(page, section);
                break;
        }
        this.skipRoute = true;
        this.redirectTo(Ext.Array.clean([pkg, page, section]).join('/'));
    },

    onLogout: function () {
        Aperitiv.getApplication().logout();
        this.internalRedirect('login');
    }
});