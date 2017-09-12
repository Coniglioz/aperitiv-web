Ext.define('Aperitiv.view.login.LoginInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.logininfo',

    init: function() {
      console.log('asd');
    },

    onSubmit: function () {
        if (!this.getView().validate()) {
            return;
        }

        var me = this,
            values = me.getView().getValues();
        me.updateLogin(me.getViewModel().get('jwtPayload'), values.name, values.info)
            .then(function (id) {
                me.redirectTo('aperitiv');
            });
    },

    updateLogin: function (user, newName, newInfo) {
        var deferred = new Ext.Deferred();

        Ext.Ajax.request({
            url: BACKEND.URL + '/api/login/' + user.id,
            method: 'PUT',
            jsonData: {
                name: newName,
                info: newInfo
            },
            callback: function (options, success, response) {
                if (success) {
                    var result = Ext.decode(response.responseText, true);
                    deferred.resolve(result.id);
                } else {
                    deferred.reject();
                }
            }
        });

        return deferred.promise;
    }
});