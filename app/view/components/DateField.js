Ext.define('Aperitiv.components.DateField', {
    extend: 'Ext.field.Text',
    xtype: 'aperitivdatefield',
    requires: [
        'Ext.data.validator.Date',
        'Ext.field.trigger.Date',
        'Ext.panel.Date'
    ],

    cls: 'aperitiv-date-field',

    config: {
        dateFormat: 'Y-m-d',
        triggers: {
            expand: {
                type: 'date'
            }
        }
    },

    clearable: false,
    labelAlign: 'top',

    inputType: 'date',
    classCls: Ext.baseCSSPrefix + 'datepickerfield',
    parseValidator: 'date',

    onExpandTap: Ext.emptyFn,

    applyValue: function (value, oldValue) {
        if (!(value || value === 0)) {
            value = null;
        }

        value = this.callParent([value, oldValue]);

        if (value) {
            if (this.isConfiguring) {
                this.originalValue = value;
            }

            // The same date value may not be the same reference, so compare them by time. 
            // If we have dates for both, then compare the time. If they're the same we 
            // don't need to do anything. 
            if (Ext.isDate(value) && Ext.isDate(oldValue) && value.getTime() === oldValue.getTime()) {
                return;
            }
        }

        return value;
    },

    applyInputValue: function (value, oldValue) {
        if (Ext.isDate(value)) {
            value = Ext.Date.format(value, this.getDateFormat());
        }

        return this.callParent([value, oldValue]);
    },

    applyDateFormat: function (dateFormat) {
        return dateFormat || Ext.util.Format.defaultDateFormat;
    },

    updateDateFormat: function () {
        let me = this,
            value;

        if (!me.isConfiguring && !me.hasFocus) {
            value = me.getValue();
            if (Ext.isDate(value)) {
                me.setInputValue(value);
            }
        }
    },

    getFormattedValue: function (format) {
        let value = this.getValue();
        return Ext.isDate(value) ? Ext.Date.format(value, format || this.getDateFormat()) : '';
    },

    parseValue: function (value, errors) {
        let date;

        if (value) {
            date = Ext.Date.parse(value, this.getDateFormat());
            if (date !== null) {
                return date;
            }
        }
        return this.callParent([value, errors]);
    },

    transformValue: function (value) {
        if (Ext.isObject(value)) {
            value = new Date(value.year, value.month, value.day);

            if (isNaN(value.getTime())) {
                value = null;
            }
        }

        return value;
    }
});