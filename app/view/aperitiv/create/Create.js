Ext.define('Aperitiv.view.aperitiv.create.Create', {
    extend: 'Ext.Container',
    xtype: 'aperitivcreate',

    controller: 'aperitivcreate',

    layout: 'card',

    items: [{
        xtype: 'aperitivcreatewhere',
        itemId: 'aperitivCreateWhere'
    }]
});