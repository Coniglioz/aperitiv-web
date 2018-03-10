Ext.define('Aperitiv.view.aperitiv.list.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.aperitivlist',

    onAdd: function () {
        Aperitiv.getApplication().getMainView().getController().internalRedirect('aperitiv', 'create', 'where');
    }
});