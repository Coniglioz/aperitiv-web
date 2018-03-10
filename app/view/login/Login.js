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
            iconCls: 'icon-chevron-right',
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
        required: true,
        queryMode: 'local',
        store: {
            type: 'countries'
        },
        valueField: 'isoCode',
        displayField: 'localizationText',
        localized: {
            label: '{login.countryLabel}'
        },
        bind: {
            value: '{country}'
        }
    }, {
        xtype: 'containerfield',
        name: 'telephoneNumberFull',
        items: [{
            xtype: 'combobox',
            margin: '0 10 0 0',
            required: true,
            queryMode: 'local',
            store: {
                type: 'countries'
            },
            valueField: 'isoCode',
            displayField: 'countryCode1',
            width: 100,
            name: 'countryCode',
            localized: {
                label: '{login.countryCodeLabel}'
            },
            bind: {
                value: '{country}'
            }
        }, {
            xtype: 'textfield',
            inputType: 'tel',
            required: true,
            flex: 1,
            name: 'telephoneNumber',
            localized: {
                label: '{login.telephoneNumberLabel}'
            }
        }]
    }]
});