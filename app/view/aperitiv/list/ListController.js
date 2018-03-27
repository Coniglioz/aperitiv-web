Ext.define('Aperitiv.view.aperitiv.list.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.aperitivlist',

    onAdd: function () {
        Aperitiv.getApplication().getMainView().getController().internalRedirect('aperitiv', 'create', 'where');
    },

    onActivate: function () {
        let me = this;

        me.getView().mask(Aperitiv.getApplication().getMaskConfig());
        me.loadAperitiv()
            .always(() => me.getView().unmask());

        me.addButton = me.addButton || Ext.create('Ext.Button', {
            iconCls: 'icon-glass2 icon-2x',
            floated: true,
            handler: me.onAdd,
            scope: me,
            ui: 'action round',
            padding: 15,
            bottom: 20,
            right: 20
        });
        me.addButton.show();
    },

    onDeactivate: function (cmp) {
        this.addButton.hide();
    },

    loadAperitiv: function () {
        let deferred = new Ext.Deferred();

        this.getView().getStore().reload(function (records, operation, success) {
            if (success) {
                deferred.resolve();
            } else {
                deferred.reject('Errore caricamento eventi');
            }
        });

        return deferred.promise;
    }
});