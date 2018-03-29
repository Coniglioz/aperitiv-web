Ext.define('Aperitiv.view.aperitiv.create.tabs.When', {
    extend: 'Ext.form.Panel',
    xtype: 'aperitivcreatewhen',

    referenceHolder: true,
    defaultListenerScope: true,

    bodyPadding: '8 10',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
        xtype: 'aperitivdatefield',
        value: new Date(),
        name: 'date',
        required: true,
        localized: {
            label: '{create.when.date}'
        },
        listeners: {
            change: 'onChange'
        }
    }, {
        xtype: 'aperitivtimefield',
        value: new Date(),
        required: true,
        name: 'time',
        localized: {
            label: '{create.when.time}'
        },
        listeners: {
            change: 'onChange'
        }
    }],

    listeners: {
        activate: 'onChange'
    },

    onChange: function () {
        this.lookupViewModel().set('confirmEnabled', this.isValid());
        if (this.isValid()) {
            this.lookupViewModel().set('date', this.down('aperitivdatefield').getValue());
            this.lookupViewModel().set('time', this.down('aperitivtimefield').getValue());
        }
    }
});