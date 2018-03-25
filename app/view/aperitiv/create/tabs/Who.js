Ext.define('Aperitiv.view.aperitiv.create.tabs.Who', {
    extend: 'Ext.dataview.List',
    xtype: 'aperitivcreatewho',

    referenceHolder: true,
    defaultListenerScope: true,

    store: 'contacts',
    cls: 'aperitiv-location-picker aperitiv-contacts-picker',

    selectable: {
        mode: 'multi'
    },

    itemTpl: '<div class="aperitiv-location-picker-text"><b>{name}</b><br><small>{info}</small></div>',

    listeners: {
        childtap: 'onSelectionChange',
        buffer: 50
    },

    onSelectionChange: function (list) {
        this.lookupViewModel().set('confirmEnabled', !Ext.isEmpty(list.getSelectable().getSelections()));
    }
});