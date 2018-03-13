Ext.define('Aperitiv.model.PlaceAutoComplete', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [{
        name: 'structured_formatting'
    }, {
        name: 'matched_substrings'
    }, {
        name: 'description',
        type: 'string'
    }, {
        name: 'id',
        type: 'string'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'terms'
    }, {
        name: 'place_id',
        type: 'string'
    }, {
        name: 'reference',
        type: 'string'
    }, {
        name: 'types'
    }, {
        name: 'iconCls',
        calculate: function () {
            return 'icon-map-marker';
        }
    }]
});