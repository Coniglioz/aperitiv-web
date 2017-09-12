Ext.define('Aperitiv.view.login.LoginInfo', {
    extend: 'Ext.form.Panel',
    xtype: 'logininfo',

    controller: 'logininfo',

    bodyPadding: 20,
    localized: {
        title: '{logininfo.title}'
    },

    header: {
        xtype: 'panelheader',
        titlePosition: 0,
        items: [{
            xtype: 'button',
            localized: {
                text: '{logininfo.confirm}'
            },
            ui: 'action',
            iconAlign: 'right',
            iconCls: 'x-fa fa-arrow-right',
            handler: 'onSubmit'
        }]
    },

    items: [{
        xtype: 'component',
        localized: {
            html: '{logininfo.helpText}'
        }
    }, {
        xtype: 'textfield',
        required: true,
        name: 'name',
        localized: {
            label: '{logininfo.nameLabel}'
        }
    }, {
        xtype: 'textfield',
        name: 'info',
        localized: {
            label: '{logininfo.infoLabel}'
        }
    }]
});