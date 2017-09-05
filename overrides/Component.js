Ext.define('Aperitiv.overrides.Component', {
    override: 'Ext.Component',

    statics: {
        eachNested: function (obj, callback, scope) {
            Ext.Object.each(obj, function (key, value) {
                if (Ext.isObject(value)) {
                    Ext.Component.eachNested(value, callback, scope);
                } else if (Ext.isArray(value)) {
                    value.forEach(function (v) {
                        Ext.Component.eachNested(v, callback, scope);
                    });
                } else {
                    callback.call(scope || this, key, value, obj);
                }
            });
        }
    },

    transformInstanceConfig: function (instanceConfig) {
        var localized = Ext.apply(instanceConfig && instanceConfig.localized ? instanceConfig.localized : {}, this.localized);
        if (!Ext.isEmpty(localized)) {
            Ext.Component.eachNested(localized, function (key, value, obj) {
                obj[key] = Ext.isString(value) ? Translations.localize(value) : value;
            });
            Ext.apply(instanceConfig, localized);
        }
        return instanceConfig;
    }
});