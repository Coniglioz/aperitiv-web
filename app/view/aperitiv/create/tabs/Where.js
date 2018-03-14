Ext.define('Aperitiv.view.aperitiv.create.tabs.Where', {
    extend: 'Ext.form.Panel',
    xtype: 'aperitivcreatewhere',

    mixins: ['Ext.mixin.Mashup'],

    requiredScripts: [
        '//maps.googleapis.com/maps/api/js?key={key}&libraries={libraries}'
    ],

    referenceHolder: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
        xtype: 'textfield',
        name: 'location',
        localized: {
            placeholder: '{create.where.searchLocation}',
        },
        listeners: {
            buffer: 500,
            change: 'onSearchChange'
        }
    }, {
        reference: 'googleSearchField'
    }, {
        xtype: 'container',
        scrollable: 'vertical',
        flex: 1,
        items: [{
            xtype: 'label',
            html: 'Locali nelle vicinanze'
        }, {
            xtype: 'list',
            reference: 'placesResultsList',
            cls: 'aperitiv-location-picker',
            store: {
                model: 'Aperitiv.model.Place'
            },
            itemTpl: '<div class="aperitiv-location-picker-icon"><span class="{iconCls}"></span></div><div class="aperitiv-location-picker-text"><b>{name}</b><br><small>{vicinity}</small></div>'
        }, {
            xtype: 'label',
            html: 'Altri indirizzi'
        }, {
            xtype: 'list',
            reference: 'addressesResultsList',
            cls: 'aperitiv-location-picker',
            store: {
                model: 'Aperitiv.model.PlaceAutoComplete'
            },
            itemTpl: '<div class="aperitiv-location-picker-icon"><span class="{iconCls}"></span></div><div class="aperitiv-location-picker-text"><b>{name}</b><br><small>{vicinity}</small></div>'
        }, {
            xtype: 'list',
            reference: 'otherResultsList',
            cls: 'aperitiv-location-picker',
            itemTpl: '<div><span class="{iconCls}"></span> <b>{name}</b> <small>{vicinity}</small></div>'
        }]
    }],

    listeners: {
        activate: function () {
            Aperitiv.getApplication().geo.updateLocation();
        }
    },

    onSearchChange: function (cmp, newValue, oldValue) {
        let placesStore = this.lookupReference('placesResultsList').getStore(),
            addressesStore = this.lookupReference('addressesResultsList').getStore();

        Ext.Promise.all([this.searchPlaces(newValue), this.getPlacePredictions(newValue)])
            .then(function (results) {
                Ext.suspendLayouts();
                placesStore.loadData(results[0]);
                addressesStore.loadData(results[1]);
                Ext.resumeLayouts(true);
            });
    },

    searchPlaces: function (input) {
        let deferred = new Ext.Deferred(),
            service = new google.maps.places.PlacesService(this.lookupReference('googleSearchField').element.dom),
            params = {};

        if (!Ext.isEmpty(input)) {
            params.keyword = input;
            params.location = new google.maps.LatLng(Aperitiv.getApplication().geo.getLatitude(), Aperitiv.getApplication().geo.getLongitude());
            params.types = ['bar', 'cafe', 'restaurant', 'liquor_store', 'supermarket', 'bakery', 'meal_delivery', 'meal_takeaway', 'night_club', 'park', 'parking', 'bowling_alley'];
            params.rankBy = google.maps.places.RankBy.DISTANCE;
            service.nearbySearch(params, function (result, status) {
                switch (status) {
                    case google.maps.places.PlacesServiceStatus.OK:
                    case google.maps.places.PlacesServiceStatus.ZERO_RESULTS:
                        deferred.resolve(result);
                        break;
                    default:
                        deferred.reject(status);
                        break;
                }
            });
        } else {
            deferred.resolve([]);
        }

        return deferred.promise;
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