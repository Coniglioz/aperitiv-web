Ext.define('Aperitiv.mixin.TranslationsMashup', {
    extend: 'Ext.mixin.Mashup',
    alternateClassName: ['Aperitiv.Translations', 'Translations'],

    mixinConfig: {
        id: 'translations',

        extended: function (baseClass, derivedClass) {
            Translations.process(derivedClass);
        }
    },

    statics: {
        translations: {},

        localize: function (descriptor) {
            return new Ext.XTemplate(descriptor).apply(Translations.translations || {});
        },

        process: function (targetClass) {
            let body = targetClass.prototype,
                hooks = targetClass._classHooks,
                onCreated = hooks.onCreated,
                lang = (body.getLang && body.getLang()) || Translations.getLang(),
                requiredResources = body.requiredResources;

            if (requiredResources) {
                delete body.requiredResources;

                // Resolve resources by lang
                requiredResources = requiredResources.map(function (resource) {
                    return new Ext.Template(resource).apply({lang: lang});
                });

                // Load resources before to init target class
                hooks.onCreated = function () {
                    let me = this,
                        args = Ext.Array.slice(arguments);

                    // Load resources
                    Ext.Deferred
                        .all(requiredResources.map(function (resource) {
                            return Translations.loadResource(resource);
                        }))
                        .then(function (responses) {
                            responses.forEach(function (responseText) {
                                let data = Ext.decode(responseText, true);
                                if (data) {
                                    Ext.apply(Translations.translations, data);
                                } else {
                                    eval(responseText);
                                }
                            });
                            hooks.onCreated = onCreated;
                            hooks.onCreated.call(me, args);
                        }, function (err) {
                            Ext.raise('[TranslationsMashup] ' + err);
                        });
                }
            }
        },

        loadResource: function (resource) {
            let deferred = new Ext.Deferred();
            Ext.Ajax.request({
                url: resource,
                cache: true,
                callback: function (options, success, response) {
                    if (success && !Ext.isEmpty(response.responseText)) {
                        deferred.resolve(response.responseText);
                    } else {
                        deferred.reject("Error loading resource " + resource + ".");
                    }
                }
            });
            return deferred.promise;
        },

        getLang: function () {
            let lang = location.href.match(/locale=([\w-]+)/);
            return (lang && lang[1]) || 'en';
        }
    },

    onClassMixedIn: function (targetClass) {
        Translations.process(targetClass);
    }

});