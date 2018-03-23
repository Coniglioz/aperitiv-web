Ext.define('Aperitiv.components.TimeField', {
    extend: 'Aperitiv.components.InputField',
    xtype: 'aperitivtimefield',

    triggers: {
        expand: {
            type: 'date'
        }
    },
    dateFormat: 'H:i',
    inputType: 'time'
});