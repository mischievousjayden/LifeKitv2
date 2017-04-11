/**
 * Created by roy_f on 3/14/2017.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var EmergenecyService = (function () {
    function EmergenecyService(apiService, http, jwtService) {
        this.apiService = apiService;
        this.http = http;
        this.jwtService = jwtService;
    }
    //Assistance
    EmergenecyService.prototype.commentEmergency = function (emergencyId, comment) {
        var path = "/assist/comment?accesstoken=" + this.jwtService.getAccessToken();
        var body = new http_1.URLSearchParams();
        body.append('emergencyid', emergencyId);
        body.append('comment', comment);
        return (this.apiService.put(path, body));
    };
    EmergenecyService.prototype.assistEmergency = function (emergencyId, response) {
        var path = "/assist/create?accesstoken=" + this.jwtService.getAccessToken();
        var body = new http_1.URLSearchParams();
        body.append('emergencyid', emergencyId);
        body.append('response', response + "");
        return (this.apiService.post(path, body));
    };
    //untested khoi
    EmergenecyService.prototype.getEmergencyStatus = function (emergencyId) {
        var path = "/emergency/status?accesstoken=" + this.jwtService.getAccessToken() + "&" + emergencyId;
        return (this.apiService.get(path).map(function (res) {
            var responderList = new Array();
            responderList = res.result;
            console.log(responderList);
            return (responderList);
        }));
    };
    EmergenecyService.prototype.endEmergency = function () {
        var _this = this;
        if (this.hostingEmergencyId) {
            var path = "/emergency/end?accesstoken=" + this.jwtService.getAccessToken();
            var body = new http_1.URLSearchParams();
            body.set('emergencyid', this.hostingEmergencyId);
            return (this.apiService.put(path, body).map(function (res) {
                _this.hostingEmergencyId = null;
                //for now return res
                return (res);
            }));
        }
    };
    EmergenecyService.prototype.startEmergency = function (userName, address, geo) {
        var _this = this;
        var path = "/emergency/start?accesstoken=" + this.jwtService.getAccessToken();
        var body = new http_1.URLSearchParams();
        body.set('lat', geo.coords.latitude.valueOf() + "");
        body.set('lng', geo.coords.longitude.valueOf() + "");
        body.set('user_nickname', userName);
        body.set('address', JSON.stringify(address));
        return (this.apiService.post(path, body).map(function (res) {
            _this.hostingEmergencyId = res.result;
            return (res.result);
        }));
    };
    EmergenecyService.prototype.updateCarrierLocation = function (lat, lng) {
        var path = "/update/location?accesstoken=" + this.jwtService.getAccessToken();
        var body = new http_1.URLSearchParams();
        body.set('lat', lat.toString());
        body.set('lng', lng.toString());
        return this.apiService.post(path, body);
    };
    EmergenecyService.prototype.reportOnDuty = function (lat, lng) {
        var path = "/emergency/onduty?accesstoken=" + this.jwtService.getAccessToken() + "&lat=" + lat + "&lng=" + lng;
        return this.apiService.get(path).map(function (res) {
            var emergencies = new Array();
            var array = res.result;
            array.forEach(function (res) {
                var temp;
                temp = res;
                temp.emergency_address = JSON.parse(res.emergency_address + "");
                emergencies.push(res);
            });
            return (emergencies);
        });
    };
    EmergenecyService.ACCEPT_EMERGENCY = 1;
    EmergenecyService = __decorate([
        core_1.Injectable()
    ], EmergenecyService);
    return EmergenecyService;
}());
exports.EmergenecyService = EmergenecyService;
