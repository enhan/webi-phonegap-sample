/**
 * Created by emmanuel on 31/01/14.
 */


function WebiLoader() {
    this.server = "http://192.168.0.50";
    this.scriptInfo = undefined;
    this.pendingHash = undefined;
}


WebiLoader.prototype = {

    load: function () {
        console.log("Loading app...");
        this.scriptInfo = this.searchExistingStorage();
        console.log("info loaded");
        var self = this;
        return this.getCurrentHash().then(function(hash){
            if (self.scriptInfo === undefined || self.scriptInfo === null || self.scriptInfo !== hash){
                // Script info is not set or is different, download !
                console.log("Script not found or not existing.");
                return self.loadRemote();
            }else{
                console.log("Script exists already !");
                return self.requireFS().then(function(fs){
                    var fileEntry = new FileEntry("script.js", fs.root.fullPath + "/Webinage/script.js", fs);
                    return self.loadScript(fileEntry);
                });
            }
        });

    },

    getCurrentHash: function () {
        var deferred = Q.defer();
        // JQuery ajax call to get current hash
        var self = this;
        $.getJSON(this.server + "/webisample/digest.json").done(function(data, status, xhr){
            console.log("Hash is " + data.hash);
            self.pendingHash = data.hash;
            deferred.resolve(data.hash);
        }).fail(function(xhr, status, error){
            console.log("Could not get hash, should fallback");
            deferred.reject();
        });
        return deferred.promise;
    },

    searchExistingStorage: function () {
        // Search storage to get data
        console.log("Load info about script");
        return window.localStorage.getItem('scriptInfo');
    },


    loadRemote: function () {
        console.log("Load remote !!");
        console.log("Using server " + this.server);

        return this.requireFS().then(this.downloadScript.bind(this)).then(this.loadScript.bind(this));
    },
    downloadScript: function (fs) {
        // First, check
        console.log("Download script !!");
        console.log("Using server " + this.server);
        var targetServ = this.server;
        var deferred = Q.defer();
        var fileTransfert = new FileTransfer();
        if (fileTransfert === undefined || fileTransfert === null){
            console.log("Error with plugin");
            deferred.reject();
        }


        var dlUrl = encodeURI( targetServ + "/webisample/simple.js");
        var target = fs.root.fullPath + '/Webinage/script.js';

        console.log("About to download from : " + dlUrl);
        var self = this;
        fileTransfert.download(
            dlUrl,
            target,
            function (entry) {
                console.log("download complete: " + entry.fullPath);
                // save it in local storage

                console.log(self.pendingHash);
                window.localStorage.setItem("scriptInfo", self.pendingHash);

                var obj = self.searchExistingStorage();
                console.log(obj);

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
                deferred.resolve(fs);
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