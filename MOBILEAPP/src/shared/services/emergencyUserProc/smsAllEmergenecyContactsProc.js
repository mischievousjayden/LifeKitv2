"use strict";
var ionic_native_1 = require("ionic-native");
/**
 * Created by roy_f on 4/11/2017.
 */
var SMSAllEmergencyContactsProc = (function () {
    function SMSAllEmergencyContactsProc(userSettingsService, deviceService) {
        this.deviceService = deviceService;
        this.userSettings = userSettingsService.loadUserSettings();
    }
    SMSAllEmergencyContactsProc.prototype.contactAllStartEmergency = function (geo) {
        var _this = this;
        //send SMS message
        var list = this.deviceService.getEmergencyContacts();
        list.forEach(function (item) {
            console.log(item);
            item.phone.forEach(function (phone) {
                console.log(phone);
                if (phone) {
                    var googleMapUrl = "http://maps.google.com/maps?q=loc:" + geo.coords.latitude + "," + geo.coords.longitude;
                    ionic_native_1.SMS.send(phone.value, _this.userSettings.firstName + ' Is currently having an overdose. Navigate to: ' + googleMapUrl);
                }
            });
        });
    };
    return SMSAllEmergencyContactsProc;
}());
exports.SMSAllEmergencyContactsProc = SMSAllEmergencyContactsProc;
