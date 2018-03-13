Ext.define('Aperitiv.view.aperitiv.create.tabs.Where', {
    extend: 'Ext.form.Panel',
    xtype: 'aperitivcreatewhere',

    mixins: ['Ext.mixin.Mashup'],

    requiredScripts: [
        '//maps.googleapis.com/maps/api/js?key={key}&libraries={libraries}'
    ],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
        id: 'powered-by-google'
    }, {
        xtype: 'combobox',
        name: 'location',
        localized: {
            placeholder: '{create.where.searchLocation}',
        },
        hideTrigger: true,
        picker: {
            xtype: 'list',
            cls: 'aperitiv-location-picker',
            floated: false,
            setValue: Ext.emptyFn,
            selectable: {
                mode: 'single',
                deselectable: false
            },
            itemTpl: '<div><span class="{iconCls}"></span> <b>{name}</b> <small>{vicinity}</small></div>'
        },
        queryMode: 'remote',
        valueField: 'place_id',
        displayField: 'name',
        store: {
            model: 'Aperitiv.model.Place',
            proxy: {
                type: 'google-places'
            }
        },
        listeners: {
            pickercreate: function (cmp, picker) {
                cmp.pickerType = null;
                picker.setStore(cmp.getStore());
                cmp.up().down('#locationPickerContainer').add(picker);
                picker.on('beforehide', function () {
                    return false;
                })
            }
        }
    }, {
        xtype: 'container',
        scrollable: 'vertical',
        flex: 1,
        items: [{
            xtype: 'container',
            itemId: 'locationPickerContainer'
        }, {
            xtype: 'container',
            itemId: 'otherResultsContainer'
        }]
    }],

    listeners: {
        activate: function () {
            Aperitiv.getApplication().geo.updateLocation();
        }
    },

    getPlacePredictions: function (input) {
        let deferred = new Ext.Deferred(),
            service = new google.maps.places.AutocompleteService(),
            params = {};

        if (!Ext.isEmpty(input)) {
            params.input = input;
            params.location = new google.maps.LatLng(Aperitiv.getApplication().geo.getLatitude(), Aperitiv.getApplication().geo.getLongitude());
            params.radius = 10000;
            params.types = ['establishment'];
            service.getPlacePredictions(params, function (result) {
                deferred.resolve(result);
            });
        } else {
            deferred.resolve([]);
        }

        return deferred.promise;
    }
});