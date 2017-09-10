Ext.define('Aperitiv.view.aperitiv.Aperitiv', {
    extend: 'Ext.Panel',
    xtype: 'aperitiv',

    layout: 'fit',

    localized: {
        title: '{list.title}'
    },

    header: {
        xtype: 'panelheader',
        titlePosition: 0,
        items: [{
            xtype: 'button',
            ui: 'action',
            arrow: false,
            iconCls: 'x-fa fa-bars',
            menu: {
                items: [{
                    localized: {
                        text: '{menu.logout}'
                    },
                    iconCls: ' x-fa fa-sign-out',
                    handler: 'onLogout'
                }]
            }
        }]
    },

    items: [{
        xtype: 'aperitivlist'
    }]
});