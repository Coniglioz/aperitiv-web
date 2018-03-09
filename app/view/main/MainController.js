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
        let user = this.getViewModel().get('jwtPayload');
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
        let deferred = new Ext.Deferred();

        if (Ext.platformTags.desktop) {
            deferred.reject();
        } else {
            let options = new ContactFindOptions();
            options.multiple = true;
            options.hasPhoneNumber = true;
            navigator.contacts.find(['*'], function (contacts) {
                Ext.Ajax.request({
                    url: BACKEND.URL + '/api/contact/check',
                    method: 'POST',
                    jsonData: {
                        contacts: contacts
                    },
                    callback: function (options, success, response) {
                        if (success) {
                            let result = Ext.decode(response.responseText, true),
                                store = Ext.data.StoreManager.lookup('contacts');
                            store.loadData(result.data);
                            deferred.resolve();
                        } else {
                            window.alert('Errore check contatti');
                            deferred.reject('Errore check contatti');
                        }
                    }
                });
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