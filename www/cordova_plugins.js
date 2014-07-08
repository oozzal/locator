cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "../plugins/com.phonegap.plugins.bluetooth/www/bluetooth.js",
        "id": "com.phonegap.plugins.bluetooth.bluetooth",
        "clobbers": [
            "bluetooth"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.phonegap.plugins.bluetooth": "0.9"
}
// BOTTOM OF METADATA
});
