Ext.define('Aperitiv.view.aperitiv.AperitivController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.aperitiv',

    init: function () {
        let me = this;

        me.loadContacts()
            .then(Ext.emptyFn, function (error) {
                Ext.raise(error);
            });
    },

    loadContacts: function () {
        let deferred = new Ext.Deferred();

        if (!navigator || !navigator.contacts) {
            Ext.Ajax.request({
                url: BACKEND.URL + '/api/contact/check',
                method: 'POST',
                jsonData: {
                    contacts: []
                },
                callback: function (options, success, response) {
                    if (success) {
                        let result = Ext.decode(response.responseText, true),
                            store = Ext.data.StoreManager.lookup('contacts');
                        store.loadData(result.data);
                        deferred.resolve([]);
                    } else {
                        deferred.reject('Errore check contatti');
                    }
                }
            });
        } else {
            let options = new ContactFindOptions();
            options.multiple = true;
            options.desiredFields = [
                navigator.contacts.fieldType.id, navigator.contacts.fieldType.name,
                navigator.contacts.fieldType.nickname, navigator.contacts.fieldType.phoneNumbers,
                navigator.contacts.fieldType.photos
            ];
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
                            deferred.resolve(contacts);
                        } else {
                            deferred.reject('Errore check contatti');
                        }
                    }
                });
            }, function (contactError) {
                deferred.reject(contactError);
            }, options);
        }

        return deferred.promise;
    }
});