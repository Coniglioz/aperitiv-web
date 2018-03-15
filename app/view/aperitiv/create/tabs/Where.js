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
        reference: 'placesResultsContainer',
        flex: 1,
        items: [{
            xtype: 'label',
            reference: 'placesResultsLabel',
            localized: {
                html: '{create.where.nearPlaces}',
            },
            hidden: true
        }, {
            xtype: 'list',
            reference: 'placesResultsList',
            cls: 'aperitiv-location-picker',
            store: {
                model: 'Aperitiv.model.Place'
            },
            itemTpl: '<div class="aperitiv-location-picker-icon"><span class="{iconCls}"></span></div><div class="aperitiv-location-picker-text"><b>{name}</b><br><small>{vicinity}</small></div>',
            listeners: {
                select: 'onListSelect'
            }
        }, {
            xtype: 'label',
            reference: 'addressesResultsLabel',
            localized: {
                html: '{create.where.addressPlaces}'
            },
            hidden: true
        }, {
            xtype: 'list',
            reference: 'addressesResultsList',
            cls: 'aperitiv-location-picker',
            store: {
                model: 'Aperitiv.model.PlaceAutoComplete'
            },
            itemTpl: '<div class="aperitiv-location-picker-icon"><span class="{iconCls}"></span></div><div class="aperitiv-location-picker-text"><b>{name}</b><br><small>{vicinity}</small></div>',
            listeners: {
                select: 'onListSelect'
            }
        }, {
            xtype: 'list',
            reference: 'otherResultsList',
            cls: 'aperitiv-location-picker',
            store: {
                fields: ['id', 'text', 'iconCls']
            },
            itemTpl: '<div class="aperitiv-location-picker-icon"><span class="{iconCls}"></span></div><div class="aperitiv-location-picker-text"><b>{title}</b><br><small>{text}</small></div>',
            listeners: {
                select: 'onListSelect'
            }
        }]
    }],

    listeners: {
        activate: function () {
            Aperitiv.getApplication().geo.updateLocation();
            this.lookupReference('otherResultsList').getStore().loadData([{
                id: 'free',
                title: Translations.localize('{create.where.otherPlaces.freeTitle}'),
                text: Translations.localize('{create.where.otherPlaces.freeText}'),
                iconCls: 'icon-map-marker-crossed'
            }]);
        }
    },

    onSearchChange: function (cmp, newValue, oldValue) {
        let placesStore = this.lookupReference('placesResultsList').getStore(),
            placesLabel = this.lookupReference('placesResultsLabel'),
            addressesStore = this.lookupReference('addressesResultsList').getStore(),
            resultsContainer = this.lookupReference('placesResultsContainer'),
            addressesLabel = this.lookupReference('addressesResultsLabel');

        resultsContainer.mask(Aperitiv.getApplication().getMaskConfig());
        Ext.Promise.all([this.searchPlaces(newValue), this.getPlacePredictions(newValue)])
            .then(function (results) {
                Ext.suspendLayouts();
                placesStore.loadData(results[0]);
                addressesStore.loadData(results[1]);
                placesLabel.setHidden(Ext.isEmpty(results[0]));
                addressesLabel.setHidden(Ext.isEmpty(results[1]));
                Ext.resumeLayouts(true);
            })
            .finally(function () {
                resultsContainer.unmask();
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
    },

    onListSelect: function (list, selected) {
        console.log(selected);
    }
});