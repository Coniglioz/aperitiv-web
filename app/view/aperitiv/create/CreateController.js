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

    onConfirm: function () {
        switch (this.getView().getActiveItem().getXTypes()) {
            case 'widget/component/container/panel/fieldpanel/formpanel/aperitivcreatewhere':
                this.onConfirmWhere();
                break;
        }
    },

    onConfirmWhere: function () {
        Aperitiv.getApplication().getMainView().getController().internalRedirect('aperitiv', 'create', 'when');
    }
});