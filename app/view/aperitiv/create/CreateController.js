Ext.define('Aperitiv.view.aperitiv.create.CreateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.aperitivcreate',

    onActivate: function (view) {
        this.confirmBtn = view.up('aperitiv').getHeader().add({
            xtype: 'aperitivconfirmbutton',
            handler: this.onConfirm,
            scope: this,
            bind: {
                hidden: '{!confirmEnabled}'
            }
        });
    },

    onDeactivate: function (view) {
        view.up('aperitiv').getHeader().remove(this.confirmBtn);
        this.confirmBtn = null;
    },

    onActiveItemChange: function (view, activeItem) {
        if (activeItem.isXType('aperitivcreatewho')) {
            this.confirmBtn.setText(Translations.localize('{create.who.confirmButtonText}'));
        } else {
            this.confirmBtn.setText(this.confirmBtn.getInitialConfig('text'));
        }
    },

    onConfirm: function () {
        let activeItem = this.getView().getActiveItem();
        if (activeItem.isXType('aperitivcreatewhere')) {
            this.onConfirmWhere();
        } else if (activeItem.isXType('aperitivcreatewhen')) {
            this.onConfirmWhen();
        } else if (activeItem.isXType('aperitivcreatewho')) {
            this.onConfirmWho();
        }
    },

    onConfirmWhere: function () {
        Aperitiv.getApplication().getMainView().getController().internalRedirect('aperitiv', 'create', 'when');
    },

    onConfirmWhen: function () {
        Aperitiv.getApplication().getMainView().getController().internalRedirect('aperitiv', 'create', 'who');
    },

    onConfirmWho: function () {
        let me = this;

        me.getView().mask(Aperitiv.getApplication().getMaskConfig());
        me.createAperitiv(me.getViewModel().get('location'), me.getViewModel().get('date'), me.getViewModel().get('time'), me.getViewModel().get('friends'))
            .then(function () {
                Aperitiv.getApplication().getMainView().getController().internalRedirect('aperitiv', 'list');
            })
            .always(() => me.getView().unmask());
    },

    createAperitiv: function (location, date, time, friends) {
        let deferred = new Ext.Deferred(),
            locationData = location.getData();

        if (!Ext.isEmpty(locationData.geometry)) {
            locationData.geometry = {
                location: locationData.geometry.location.toJSON(),
                viewport: locationData.geometry.viewport.toJSON()
            };
        }

        Ext.Ajax.request({
            url: BACKEND.URL + '/api/event',
            method: 'POST',
            jsonData: {
                location: locationData,
                date: Ext.Date.format(date, 'Y-m-d'),
                time: Ext.Date.format(time, 'H:i:s'),
                friends: friends.map(friend => friend.getData())
            },
            callback: function (options, success, response) {
                if (success) {
                    deferred.resolve();
                } else {
                    deferred.reject('Errore creazione evento');
                }
            }
        });

        return deferred.promise;
    }
});