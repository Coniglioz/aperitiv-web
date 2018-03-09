Ext.define('Aperitiv.view.aperitiv.list.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.aperitivlist',

    onSubmit: function () {
        if (!this.getView().isValid()) {
            return;
        }

        let me = this;
        me.submitLogin('asgdhavdshxjasvjhdvajshd')
            .then(function (token) {
                Aperitiv.getApplication().login(token);
                me.redirectTo('aperitiv');
            });
    },

    submitLogin: function (phoneHash) {
        let deferred = new Ext.Deferred();

        Ext.Ajax.request({
            url: BACKEND.URL + '/api/login',
            method: 'POST',
            jsonData: {
                phoneHash: phoneHash
            },
            callback: function (options, success, response) {
                if (success) {
                    let result = Ext.decode(response.responseText, true);
                    deferred.resolve(result.token);
                } else {
                    deferred.reject();
                }
            }
        });

        return deferred.promise;
    }
});