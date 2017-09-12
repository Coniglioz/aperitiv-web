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
            before: 'loadContacts',
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
        if (route.getName() !== 'login') {
            if (!user) {
                this.redirectTo('login');
                action.stop();
            } else if (!user.name && route.getName() !== 'info') {
                this.redirectTo('info');
                action.stop();
            }
        } else {
            if (user) {
                this.redirectTo(user.name ? 'aperitiv' : 'info');
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

    onList: function () {
        Ext.suspendLayouts();
        this.getView().removeAll(true, true);
        this.getView().add({
            xtype: 'aperitiv'
        });
        Ext.resumeLayouts(true);
    },

    loadContacts: function () {
        var deferred = new Ext.Deferred();

        if (Ext.platformTags.desktop) {
            deferred.reject();
        } else {
            var options = new ContactFindOptions();
            options.multiple = true;
            options.hasPhoneNumber = true;
            navigator.contacts.find(['*'], function (contacts) {
                // todo add to store
                // todo filter
                window.alert(contacts.length);
                deferred.resolve(contacts);
            }, function (contactError) {
                window.alert(contactError);
                deferred.reject(contactError);
            }, options);
        }

        return deferred.promise;
    },

    onLogout: function () {
        Aperitiv.getApplication().logout();
        this.redirectTo('login');
    }
});