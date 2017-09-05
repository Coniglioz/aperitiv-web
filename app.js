/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'Aperitiv.Application',

    name: 'Aperitiv',

    requires: [
        // This will automatically load all classes in the Aperitiv namespace
        // so that application classes do not need to require each other.
        'Aperitiv.*'
    ],

    // The name of the initial view to create.
    mainView: 'Aperitiv.view.main.Main'
});
