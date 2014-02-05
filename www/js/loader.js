/**
 * Created by emmanuel on 31/01/14.
 */


function WebiLoader() {
    this.server = "http://192.168.0.50";
}


WebiLoader.prototype = {

    load: function () {

    },

    getCurrentHash: function () {
        var deferred = Q.defer();
        // JQuery ajax call to get current hash
        $.getJSON(this.server + "/webisample/digest.json").done(function(data, status, xhr){
            console.log("Hash is " + data.hash);
            deferred.resolve(data.hash);
        }).fail(function(xhr, status, error){
            console.log("Could not get hash, should fallback");
            deferred.reject();
        });
        return deferred.promise;
    },

    loadRemote: function () {
        console.log("Load remote !!");
        return this.requireFS().then(this.downloadScript).then(this.loadScript);
    },
    downloadScript: function (fsRoot) {
        // First, check
        console.log("Load script !!");
        var deferred = Q.defer();
        var fileTransfert = new FileTransfer();
        if (fileTransfert === undefined || fileTransfert === null){
            console.log("Error with plugin");
            deferred.reject();
        }
        var dlUrl = encodeURI(this.server + "/webisample/simple.js");
        var target = fsRoot.fullPath + '/Webinage/script.js';

        fileTransfert.download(
            dlUrl,
            target,
            function (entry) {
                console.log("download complete: " + entry.fullPath);
                deferred.resolve(entry);

            },
            function (error) {
                console.log("download error source " + error.source);
                console.log("download error target " + error.target);
                deferred.reject(error);
            },
            true

        );

        return deferred.promise;
    },

    requireFS: function () {
        console.log("Require FS");
        var deferred = Q.defer();
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
            function (fs) {
                console.log("Using " + fs.root.fullPath);
                deferred.resolve(fs.root);
            },
            function (error) {
                console.log("Error");
                deferred.reject(error);
            }
        );

        return deferred.promise;
    },
    loadScript: function (fileEntry) {
        console.log("Load local script now : " + fileEntry.toURL());
        var deferred = Q.defer();
        head.load(fileEntry.toURL(), function () {
            console.log("Sucessss");
            deferred.resolve();
        });
        return deferred.promise;
    }

};