var app = {
  isBluetoothEnabled: false,
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
    $(document).on("deviceready", this.onDeviceReady);
    $(document).on("bluetoothon", this.onBluetoothOn);
    $(document).on("bluetoothoff", this.onBluetoothOff);
    $("#bluetooth #enable-bluetooth").on("click", this.enableBluetooth);
    $("#bluetooth #disable-bluetooth").on("click", this.disableBluetooth);
    $("#bluetooth #start-discovery").on("click", this.startDiscovery);
  },
  // Check if necessary hardwares/settings are present
  setup: function() {
    typeof window.bluetooth !== "undefined" && window.bluetooth.isEnabled(function(isEnabled) {
      (isEnabled && $(document).trigger("bluetoothon")) || $(document).trigger("bluetoothoff");
    })
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    $("#deviceready .listening").hide();
    $("#deviceready .received").show();
  },
  // after bluetooth is ready
  onBluetoothOn: function() {
    $("#bluetooth #bluetoothready .listening").hide();
    $("#bluetooth #bluetoothready .received").show();
    $("#bluetooth #discovery").show();
    $("#bluetooth #enable-bluetooth").hide();
    $("#bluetooth #disable-bluetooth").show();
    this.isBluetoothEnabled = true;
  },
  // after bluetooth is disabled
  onBluetoothOff: function() {
    $("#bluetooth #bluetoothready .received").hide();
    $("#bluetooth #bluetoothready .listening").show();
    $("#bluetooth #discovery").hide();
    $("#bluetooth #enable-bluetooth").show();
    $("#bluetooth #disable-bluetooth").hide();
    this.isBluetoothEnabled = false;
  },
  // enable bluetooth
  enableBluetooth: function() {
    window.bluetooth.enable(function() {
      $(document).trigger("bluetoothon");
    });
  },
  // disable bluetooth
  disableBluetooth: function() {
    window.bluetooth.disable(function() {
      $(document).trigger("bluetoothoff");
    });
  },
  // start devices discovery
  startDiscovery: function() {
    var t1 = new Date();
    $("#bluetooth #discovery").prepend("Discovery Started<br />");
    window.bluetooth.startDiscovery(
      function(device) {
        $("#bluetooth #devices-list").append("<li>" + device.name + "@" + device.address + "</li>");
      },
      function() { $("#bluetooth #discovery").append("<br />Discovery Finished in " + (new Date() - t1)/1000 + " seconds"); }
    );
  }
};

