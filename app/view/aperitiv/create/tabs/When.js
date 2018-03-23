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
        xtype: 'aperitivdatefield',
        value: new Date(),
        name: 'date',
        localized: {
            label: '{create.when.date}'
        }
    }, {
        xtype: 'aperitivtimefield',
        value: new Date(),
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