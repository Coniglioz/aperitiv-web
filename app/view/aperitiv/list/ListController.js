Ext.define('Aperitiv.view.aperitiv.list.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.aperitivlist',

    onAdd: function () {
        this.redirectTo('aperitiv/create/where');
    }
});