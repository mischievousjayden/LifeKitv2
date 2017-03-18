"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ionic_angular_1 = require('ionic-angular');
var ionic_native_1 = require("ionic-native");
var rxjs_1 = require("rxjs");
var TypeUser = (function () {
    function TypeUser(emergencyService, geo) {
        this.emergencyService = emergencyService;
        this.geo = geo;
        this.onDutyToggled = false;
        this.onDutyToggledObserver = new rxjs_1.ReplaySubject(1);
        this.emergencies = new Array();
    }
    TypeUser.prototype.ngOnInit = function () {
        var _this = this;
        this.onDutyToggledObserver.subscribe(function (res) {
            if (res == true) {
                console.log('subscribing...');
                _this.sendLocationOb = rxjs_1.Observable.timer(0, TypeUser.sendingLocationInterval);
                _this.unsubSendLocation = _this.sendLocationOb.subscribe(function (t) {
                    _this.sendLocation();
                });
                _this.pageReportDutyOb = rxjs_1.Observable.timer(0, TypeUser.ondutyInterval);
                _this.unsubPageReport = _this.pageReportDutyOb.subscribe(function (t) {
                    _this.pageReportOnDuty();
                });
            }
            else {
                console.log('suppose to unsubscribe');
                if (_this.unsubSendLocation) {
                    console.log('unsubscribe from sending location');
                    _this.unsubSendLocation.unsubscribe();
                }
                if (_this.unsubPageReport) {
                    console.log('unsubscribe from duty');
                    _this.unsubPageReport.unsubscribe();
                }
            }
        });
    };
    TypeUser.prototype.sendLocation = function () {
        var _this = this;
        ionic_native_1.Geolocation.getCurrentPosition().then(function (resp) {
            console.log("reporting location");
            _this.emergencyService.updateCarrierLocation(resp.coords.latitude, resp.coords.longitude).subscribe(function (res) {
                console.log(res);
            });
        });
    };
    TypeUser.prototype.pageReportOnDuty = function () {
        var _this = this;
        ionic_native_1.Geolocation.getCurrentPosition().then(function (resp) {
            console.log('reporting for duty');
            _this.emergencyService.reportOnDuty(resp.coords.latitude, resp.coords.longitude).subscribe(function (res) {
                console.log(res);
                _this.emergencies = res;
            });
        });
    };
    // toDo: implement to send data to server
    TypeUser.prototype.notifyOnDuty = function () {
        console.log(this.onDutyToggled);
        this.onDutyToggledObserver.next(this.onDutyToggled);
    };
    TypeUser.sendingLocationInterval = 7000;
    TypeUser.ondutyInterval = 5000;
    __decorate([
        core_1.ViewChild(ionic_angular_1.Segment)
    ], TypeUser.prototype, "segment", void 0);
    TypeUser = __decorate([
        core_1.Component({
            templateUrl: 'typeuser.html'
        })
    ], TypeUser);
    return TypeUser;
}());
exports.TypeUser = TypeUser;
