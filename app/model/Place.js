Ext.define('Aperitiv.model.Place', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [{
        name: 'geometry'
    }, {
        name: 'html_attributions'
    }, {
        name: 'icon',
        type: 'string'
    }, {
        name: 'id',
        type: 'string'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'opening_hours'
    }, {
        name: 'photos'
    }, {
        name: 'place_id',
        type: 'string'
    }, {
        name: 'rating',
        type: 'int'
    }, {
        name: 'reference',
        type: 'string'
    }, {
        name: 'scope',
        type: 'string'
    }, {
        name: 'types'
    }, {
        name: 'vicinity',
        type: 'string'
    }, {
        name: 'iconCls',
        calculate: function (data) {
            if (Ext.isEmpty(data.types)) {
                return null;
            }

            if (data.types.indexOf('restaurant') !== -1) {
                return 'icon-dinner';
            } else if (data.types.indexOf('cafe') !== -1) {
                return 'icon-teacup';
            } else if (data.types.indexOf('bar') !== -1) {
                return 'icon-glass-cocktail';
            } else if (data.types.indexOf('store') !== -1) {
                return 'icon-bag';
            } else {
                return 'icon-map-marker';
            }
        }
    }]
});