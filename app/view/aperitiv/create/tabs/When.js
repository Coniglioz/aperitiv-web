Ext.define('Aperitiv.view.aperitiv.create.tabs.When', {
    extend: 'Ext.form.Panel',
    xtype: 'aperitivcreatewhen',

    referenceHolder: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
        xtype: 'aperitivinputfield',
        inputType: 'date',
        name: 'date',
        localized: {
            label: '{create.when.date}'
        }
    }, {
        xtype: 'aperitivinputfield',
        inputType: 'time',
        name: 'time',
        localized: {
            label: '{create.when.time}'
        }
    }],

    listeners: {
        activate: function () {
            this.lookupViewModel().set('confirmEnabled', false);
        }
    }
});