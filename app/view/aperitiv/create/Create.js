Ext.define('Aperitiv.view.aperitiv.create.Create', {
    extend: 'Ext.Container',
    xtype: 'aperitivcreate',

    controller: 'aperitivcreate',
    viewmodel: 'aperitivcreate',

    layout: 'card',

    items: [{
        xtype: 'aperitivcreatewhere',
        itemId: 'aperitivCreateWhere'
    }, {
        xtype: 'aperitivcreatewhen',
        itemId: 'aperitivCreateWhen'
    }, {
        xtype: 'aperitivcreatewho',
        itemId: 'aperitivCreateWhen'
    }],

    listeners: {
        activate: 'onActivate',
        deactivate: 'onDeactivate',
        activeItemchange: 'onActiveItemChange'
    }
});