Ext.define('Aperitiv.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    onSubmit: function () {
        if (!this.getView().validate()) {
            return;
        }

        var me = this;
        me.submitLogin('asgdhavdshxjasvjhdvajshd')
            .then(function (token) {
                Aperitiv.getApplication().login(token);
                me.redirectTo('aperitiv');
            });
    },

    submitLogin: function (phoneHash) {
        var deferred = new Ext.Deferred();

        Ext.Ajax.request({
            url: BACKEND.URL + '/api/login',
            method: 'POST',
            jsonData: {
                phoneHash: phoneHash
            },
            callback: function (options, success, response) {
                if (success) {
                    var result = Ext.decode(response.responseText, true);
                    deferred.resolve(result.token);
                } else {
                    deferred.reject();
                }
            }
        });

        return deferred.promise;
    }
});