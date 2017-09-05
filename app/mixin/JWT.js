Ext.define('Aperitiv.mixin.JWT', {
    extend: 'Ext.Mixin',
    alternateClassName: ['Aperitiv.mixin.JWT', 'JWT'],

    mixinConfig: {
        id: 'jwt',
        before: {
            launch: 'processJWT'
        },
        after: {
            destroy: 'destroyJWT'
        }
    },

    config: {

        /**
         * @cfg {String} [bindProperty=jwtPayload]
         * Specifies a name for the property to set in the main view model.
         */
        bindProperty: 'jwtPayload'
    },

    login: function (token) {
        this.updateToken(token);
    },

    logout: function () {
        this.updateToken();
    },

    privates: {

        processJWT: function () {
            var me = this;

            me.storage = Ext.util.LocalStorage.get('jwt');

            // Sync token on each server response
            Ext.Ajax.on('requestcomplete', (function (conn, response) {
                var token = response.getResponseHeader("Authorization");
                if (token) {
                    if (Ext.String.startsWith(token, 'Bearer ', true)) {
                        token = token.substring(7);
                    }
                    me.updateToken(token);
                }
            }));

            // Load token from storage
            var token = me.storage.getItem('token');
            if (token) {
                me.updateToken(token);
            }
        },

        destroyJWT: function () {
            this.storage.release();
        },

        updateToken: function (token) {
            var me = this,
                jsonPayload = me.validateToken(token),
                mainView = me.getMainView();

            if (jsonPayload !== false) {
                this.storage.setItem('token', token);

                Ext.Ajax.setDefaultHeaders(Ext.apply(Ext.Ajax.getDefaultHeaders() || {}, {
                    Authorization: 'Bearer ' + token
                }));

                mainView.getViewModel().set(me.getBindProperty(), jsonPayload);
            } else {
                this.storage.removeItem('token');

                var headers = Ext.Ajax.getDefaultHeaders() || {};
                delete headers.Authorization;
                Ext.Ajax.setDefaultHeaders(headers);

                mainView.getViewModel().set(me.getBindProperty(), null);
            }
        },

        validateToken: function (token) {
            try {
                var tokenParts = token.split('.'),
                    decodedToken = atob(tokenParts[1]),
                    jsonPayload = Ext.decode(decodedToken);

                // Check token expiration
                if (!jsonPayload.exp || Ext.Date.parse(jsonPayload.exp, 'timestamp').getTime() < (new Date).getTime()) {
                    Ext.raise('Session expired!');
                }

                return jsonPayload;
            } catch (err) {
                return false;
            }
        }
    }
});