"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ionic_native_1 = require('ionic-native');
var Elocator = (function () {
    function Elocator(navCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        // toDO: implement method to get patient and naloxone locators
        this.locators = [{
                name: 'CVS',
                address: '1286 Chestnut, PA',
                phone: '+1 215-834-8222',
                hours: 'Open: 8AM-11PM'
            }, {
                name: 'Rite aids',
                address: '1633 Chestnut, PA',
                phone: '+1 215-987-2354',
                hours: 'Open: 8AM-10PM'
            }];
        this.patient = {
            name: 'Micheal Lex',
            address: '1011 Chestnut, Unit 1, PA',
            phone: '+1 215-232-5435'
        };
        // toDO: implement method to get current location
        this.currentLocation = 'Philadelphia, PA';
        // toDO: get timer from server?
        this.etimer = 123;
    }
    Elocator.prototype.call = function (phoneNumber) {
        phoneNumber = encodeURIComponent(phoneNumber);
        window.location.assign("tel:" + phoneNumber);
    };
    Elocator.prototype.openMap = function (address) {
        var _this = this;
        ionic_native_1.LaunchNavigator.isAppAvailable(ionic_native_1.LaunchNavigator.APP.GOOGLE_MAPS).then(function (isAvailable) {
            var app;
            if (isAvailable) {
                app = ionic_native_1.LaunchNavigator.APP.GOOGLE_MAPS;
            }
            else {
                console.warn("Google Maps not available - falling back to user selection");
                app = ionic_native_1.LaunchNavigator.APP.USER_SELECT;
            }
            var options = {
                start: _this.currentLocation,
                app: app
            };
            ionic_native_1.LaunchNavigator.navigate(address, options).then(function (success) { return console.log('Launched navigator'); }, function (error) { return console.log('Error launching navigator', error); });
        });
    };
    Elocator.prototype.sendVerif = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Cancel Help Request',
            message: "Are you sure you want to cancel the patient request for help?",
            buttons: [{
                    text: 'Confirm',
                    handler: function () { _this.cancelRequest(); }
                }, {
                    text: 'Cancel',
                    role: 'cancel'
                }]
        });
        alert.present();
    };
    // toDO : to cancel the whole emergency.
    Elocator.prototype.cancelRequest = function () {
        this.navCtrl.setRoot('home');
    };
    Elocator = __decorate([
        core_1.Component({
            selector: 'e-locator',
            templateUrl: 'elocator.html'
        })
    ], Elocator);
    return Elocator;
}());
exports.Elocator = Elocator;
