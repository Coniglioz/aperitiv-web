Ext.define('Aperitiv.view.login.Login', {
    extend: 'Ext.form.Panel',
    xtype: 'login',

    controller: 'login',

    bodyPadding: 20,
    localized: {
        title: '{login.title}'
    },

    header: {
        xtype: 'panelheader',
        titlePosition: 0,
        items: [{
            xtype: 'button',
            localized: {
                text: '{login.confirm}'
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
            html: '{login.helpText}'
        }
    }, {
        xtype: 'combobox',
        name: 'country',
        localized: {
            label: '{login.countryLabel}'
        }
    }, {
        xtype: 'containerfield',
        name: 'telephoneNumberFull',
        items: [{
            xtype: 'combobox',
            margin: '0 10 0 0',
            width: 100,
            name: 'countryCode',
            localized: {
                label: '{login.countryCodeLabel}'
            }
        }, {
            xtype: 'textfield',
            inputType: 'tel',
            flex: 1,
            name: 'telephoneNumber',
            localized: {
                label: '{login.telephoneNumberLabel}'
            }
        }]
    }]
});