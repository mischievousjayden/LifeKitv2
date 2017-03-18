"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var EmergencyRequest = (function () {
    function EmergencyRequest(navCtrl, app) {
        this.navCtrl = navCtrl;
        this.app = app;
        this.timer = rxjs_1.Observable.timer(0, 1000);
        this.currentTime = EmergencyRequest.TIME_LIMIT;
    }
    EmergencyRequest.prototype.ngOnInit = function () {
        var _this = this;
        //start the timer count
        console.log('ngoninit ran');
        this.timerOb = this.timer.subscribe(function (t) {
            _this.currentTime = _this.currentTime - 1;
            if (_this.currentTime == 0) {
                //stop the subscription and then.... start the next page with the alert.
                if (_this.timerOb) {
                    _this.timerOb.unsubscribe();
                    //move to the next page
                    _this.navCtrl.push('elocator');
                }
            }
        });
    };
    //Time limit in seconds
    EmergencyRequest.TIME_LIMIT = 10;
    EmergencyRequest = __decorate([
        core_1.Component({
            templateUrl: 'request.html'
        })
    ], EmergencyRequest);
    return EmergencyRequest;
}());
exports.EmergencyRequest = EmergencyRequest;
