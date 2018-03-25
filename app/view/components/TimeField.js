Ext.define('Aperitiv.components.TimeField', {
    extend: 'Aperitiv.components.DateField',
    xtype: 'aperitivtimefield',

    triggers: {
        expand: {
            type: 'trigger',
            cls: Ext.baseCSSPrefix + 'timetrigger',
        }
    },
    dateFormat: 'H:i',
    inputType: 'time'
});