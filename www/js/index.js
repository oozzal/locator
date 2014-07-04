var bluetoothSerial = cordova.require('com.megster.cordova.bluetoothserial.bluetoothSerial');

var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
    this.setup();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    $(document).on('deviceready', this.onDeviceReady);
    $(document).on('bluetoothready', this.onBluetoothReady);
  },
  // Check if necessary hardwares/settings are present
  setup: function() {
    if(typeof bluetoothSerial !== 'undefined') $(document).trigger('bluetoothready');
    $("#scan").on("click", this.listDevices);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    $("#deviceready>.listening").css("display", "none");
    $("#deviceready>.received").css("display", "block");
  },
  // after bluetooth is ready
  onBluetoothReady: function() {
    $("#bluetoothready>.listening").css("display", "none");
    $("#bluetoothready>.received").css("display", "block");
  },
  // lists paired bluetooth devices
  listDevices: function() {
    bluetoothSerial.list(
      function(devices) {
        devices.forEach(function(device) {
          alert(device.address);
        })
      },
      function() {
        alert("no device found");
      }
    );
  }
};

