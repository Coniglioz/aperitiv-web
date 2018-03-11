Ext.define('Aperitiv.util.proxy.PlacesProxy', {
    extend: 'Ext.data.proxy.Server',
    alias: 'proxy.google-places',

    reader: {
        type: 'json',
        rootProperty: 'items',
        messageProperty: 'error'
    },

    buildUrl: function (request) {
        return '';
    },

    doRequest: function (operation) {
        let me = this,
            request = me.buildRequest(operation),
            writer = me.getWriter();

        if (writer && operation.allowWrite()) {
            request = writer.write(request);
        }

        me.buildApiRequests(request)
            .then(function (response) {
                me.processResponse(true, operation, request, response);
            }, function (error) {
                me.processResponse(false, operation, request, error);
            });

        return request;
    },

    buildApiRequests: function (request) {
        let me = this,
            action = request.getAction();

        switch (action) {
            case 'read':
                return me.buildReadApiRequests(request);
            default:
                Ext.raise('unsupported request: calendars.' + action);
                return null;
        }
    },

    privates: {
        buildReadApiRequests: function (request) {
            let deferred = new Ext.Deferred(),
                service = new google.maps.places.PlacesService(Ext.get('powered-by-google').dom),
                params = {};

            let query = request.getParam('query');
            if (query.length && !Ext.isEmpty(query[0])) {
                params.keyword = query[0];
                params.location = new google.maps.LatLng(Aperitiv.getApplication().geo.getLatitude(), Aperitiv.getApplication().geo.getLongitude());
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
        }
    }
});