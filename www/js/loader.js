/**
 * Created by emmanuel on 31/01/14.
 */


function Loader() {

}

Loader.prototype = {

    loadRemote: function () {
        // First, check
        var res = window.localStorage.getItem("");
        return res;
    }

};