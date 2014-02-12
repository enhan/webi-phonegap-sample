/**
 * Created by emmanuel on 06/02/14.
 */

function ConfigurationManager(){

    var existingConfig = window.localStorage.getItem("registeredServers");

    if (existingConfig === undefined || existingConfig === null){
        // config array does not exist, create it
        var defaultConfig = ["http://192.168.0.50/webisample", "http://192.168.0.50/webisample/inner"];
        // Stringify and store
        window.localStorage.setItem("registeredServers", JSON.stringify(defaultConfig));
        this.availableConfigs = defaultConfig;
    }else{
        this.availableConfigs = JSON.parse(existingConfig);
    }

    if (this.availableConfigs.length === 0){
        // No configs, hum...
        // should never happen
    }

    this.currentConfig = this.availableConfigs[0];

}

ConfigurationManager.prototype.changeCurrentConfig = function (newConfig) {
    this.currentConfig = newConfig;
};

webisample.factory('configService', function () {
    return new ConfigurationManager();
});



