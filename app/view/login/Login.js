Ext.define('Aperitiv.view.login.Login', {
    extend: 'Ext.Container',
    xtype: 'login',

    controller: 'login',

    layout: 'center',

    items: [{
        xtype: 'formpanel',
        width: 400,
        bodyPadding: 20,
        localized: {
            title: '{login.title}'
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
    }]
});