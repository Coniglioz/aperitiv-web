Ext.define('Aperitiv.components.ConfirmButton', {
    extend: 'Ext.Button',
    xtype: 'aperitivconfirmbutton',

    localized: {
        text: '{login.confirm}'
    },

    ui: 'action',
    iconAlign: 'right',
    iconCls: 'icon-chevron-right'
});