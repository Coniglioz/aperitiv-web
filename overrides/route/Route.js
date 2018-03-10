Ext.define('Pallex.overrides.route.Route', {
    override: 'Ext.route.Route',

    execute: function (token, argConfig) {
        var promise = this.callParent([token, argConfig]);

        promise.catch(function (error) {
            if (error instanceof Error) {
                throw error;
            }
        });

        return promise;
    }
});