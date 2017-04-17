"use strict";
var flashlightProc_1 = require("./flashlightProc");
var vibrateProc_1 = require("./vibrateProc");
var beepingProc_1 = require("./beepingProc");
var countDownProc_1 = require("./countDownProc");
var smsAllEmergenecyContactsProc_1 = require("./smsAllEmergenecyContactsProc");
var ionic_native_1 = require("ionic-native");
var EmergencyUserProc = (function () {
    function EmergencyUserProc(deviceService, userSettingService, emergencyService) {
        this.deviceService = deviceService;
        this.userSettingService = userSettingService;
        this.emergencyService = emergencyService;
        this.flashLightProc = new flashlightProc_1.FlashLightProc();
        this.vibrateProc = new vibrateProc_1.VibrateProc();
        this.beepingProc = new beepingProc_1.BeepingProc();
        this.countDownProc = new countDownProc_1.CountDownProc();
        this.smsAllEmergencyContactsProc = new smsAllEmergenecyContactsProc_1.SMSAllEmergencyContactsProc(this.userSettingService, this.deviceService);
        this.userSettings = userSettingService.loadUserSettings();
    }
    EmergencyUserProc.prototype.startEmergencyProc = function () {
        var _this = this;
        this.flashLightProc.startFlashing();
        this.vibrateProc.startVibrate();
        this.beepingProc.startBeepingProc();
        this.countDownProc.startTimerTillEnd().then(function () {
            console.log('count down reached!');
            ionic_native_1.Geolocation.getCurrentPosition().then(function (geo) {
                console.log('geolocation found preparing to notify server and contacts...');
                _this.startEmergencyWithServer(geo);
                _this.smsAllEmergencyContactsProc.contactAllStartEmergency(geo);
            });
        });
    };
    EmergencyUserProc.prototype.stopEmergencyProc = function () {
        this.flashLightProc.stopFlashing();
        this.vibrateProc.stopVibrate();
        this.beepingProc.stopBeepingProc();
        this.endEmergencyWithServer();
    };
    EmergencyUserProc.prototype.endEmergencyWithServer = function () {
        this.emergencyService.endEmergency();
    };
    EmergencyUserProc.prototype.startEmergencyWithServer = function (geolocation) {
        var addr;
        try {
            this.userSettings = this.userSettingService.loadUserSettings();
            if (this.userSettings.addresses != null) {
                addr = this.userSettings.addresses[0];
                this.emergencyService.startEmergency(this.userSettings.firstName, addr, geolocation);
            }
            else {
                this.emergencyService.startEmergency(this.userSettings.firstName, null, geolocation);
            }
            console.log('Successfully sent emergency...');
        }
        catch (e) {
            console.log('Server: failed to send emergency.');
        }
    };
    return EmergencyUserProc;
}());
exports.EmergencyUserProc = EmergencyUserProc;
