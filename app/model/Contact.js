Ext.define('Aperitiv.model.Contact', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'phoneNumber',
        type: 'string'
    }, {
        name: 'info',
        type: 'string'
    }, {
        name: 'contact'
    }]
});