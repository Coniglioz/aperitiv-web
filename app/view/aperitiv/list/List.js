Ext.define('Aperitiv.view.aperitiv.list.List', {
    extend: 'Ext.dataview.List',
    xtype: 'aperitivlist',

    controller: 'aperitivlist',

    doDestroy: function () {
        this.addButton.destroy();
        this.addButton = null;
        this.callParent(arguments);
    },

    listeners: {
        deactivate: function (cmp) {
            this.addButton.hide();
        },
        activate: function () {
            this.addButton = this.addButton || Ext.create('Ext.Button', {
                iconCls: 'icon-glass2 icon-2x',
                floated: true,
                handler: this.getController().onAdd,
                scope: this.getController(),
                ui: 'action round',
                padding: 15,
                bottom: 20,
                right: 20
            });
            this.addButton.show();
        }
    }
});