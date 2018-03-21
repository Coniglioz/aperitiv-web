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
        xtype: 'datefield',
        name: 'day',
        localized: {
            placeholder: '{create.when.day}'
        }
    }],

    listeners: {
        activate: function () {
            this.lookupViewModel().set('confirmEnabled', false);
        }
    }
});