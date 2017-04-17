"use strict";
var rxjs_1 = require("rxjs");
/**
 * Created by roy_f on 4/11/2017.
 */
var CountDownProc = (function () {
    function CountDownProc() {
        this.timer = rxjs_1.Observable.timer(0, 1000);
        this.countingDownTime = CountDownProc.TIME_LIMIT;
    }
    //Start Timer returns the promise when the timer is up for it to be resolved.
    CountDownProc.prototype.startTimerTillEnd = function () {
        var _this = this;
        return (new Promise(function (resolve, reject) {
            _this.timerOb = _this.timer.subscribe(function (t) {
                _this.countingDownTime = _this.countingDownTime - 1;
                if (_this.countingDownTime <= 0) {
                    if (_this.timerOb) {
                        _this.timerOb.unsubscribe();
                        //action when the timer has when down ....
                        resolve();
                    }
                }
            });
        }));
    };
    //Time limit in seconds
    CountDownProc.TIME_LIMIT = 2;
    return CountDownProc;
}());
exports.CountDownProc = CountDownProc;
