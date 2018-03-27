Ext.define('Aperitiv.view.aperitiv.list.List', {
    extend: 'Ext.dataview.List',
    xtype: 'aperitivlist',

    controller: 'aperitivlist',

    store: {
        model: 'Aperitiv.model.Aperitiv',
        proxy: {
            type: 'ajax',
            url: BACKEND.URL + '/api/event',
            reader: {
                type: 'json',
                rootProperty: 'events'
            }
        }
    },

    loadingText: false,
    itemTpl: '{id}',

    doDestroy: function () {
        this.addButton.destroy();
        this.addButton = null;
        this.callParent(arguments);
    },

    listeners: {
        deactivate: 'onDeactivate',
        activate: 'onActivate'
    }
});