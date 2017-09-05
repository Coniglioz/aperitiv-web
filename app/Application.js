Ext.define('Aperitiv.Application', {
    extend: 'Ext.app.Application',
    mixins: {
        translations: 'Aperitiv.mixin.TranslationsMashup',
        jwt: 'Aperitiv.mixin.JWT'
    },

    requires: [
        'Ext.form.Panel',
        'Ext.field.Text',
        'Ext.field.ComboBox',
        'Ext.layout.Center',
        'Ext.layout.HBox',
        'Ext.layout.VBox',
        'Ext.field.Container',
        'Ext.dataview.List'
    ],

    requiredResources: [
        'resources/locale/{lang}/{lang}.json',
        'resources/locale/{lang}/ext-locale-{lang}.js'
    ],

    name: 'Aperitiv',

    defaultToken: 'aperitiv',

    getLang: function () {
        var lang = location.href.match(/locale=([\w-]+)/);
        return (lang && lang[1]) || 'it';
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});