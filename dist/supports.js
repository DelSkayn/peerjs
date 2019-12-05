"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var adapter_1 = require("./adapter");
exports.Supports = new /** @class */ (function () {
    function class_1() {
        this.isIOS = ['iPad', 'iPhone', 'iPod'].includes(navigator.platform);
        this.supportedBrowsers = ['firefox', 'chrome', 'safari'];
        this.minFirefoxVersion = 59;
        this.minChromeVersion = 72;
        this.minSafariVersion = 605;
    }
    class_1.prototype.isWebRTCSupported = function () {
        return typeof RTCPeerConnection !== 'undefined';
    };
    ;
    class_1.prototype.isBrowserSupported = function () {
        var browser = this.getBrowser();
        var version = this.getVersion();
        var validBrowser = this.supportedBrowsers.includes(browser);
        if (!validBrowser)
            return false;
        if (browser === 'chrome')
            return version >= this.minChromeVersion;
        if (browser === 'firefox')
            return version >= this.minFirefoxVersion;
        if (browser === 'safari')
            return !this.isIOS && version >= this.minSafariVersion;
        return false;
    };
    class_1.prototype.getBrowser = function () {
        return adapter_1.webRTCAdapter.browserDetails.browser;
    };
    class_1.prototype.getVersion = function () {
        return adapter_1.webRTCAdapter.browserDetails.version || 0;
    };
    class_1.prototype.isUnifiedPlanSupported = function () {
        var browser = this.getBrowser();
        var version = adapter_1.webRTCAdapter.browserDetails.version || 0;
        if (browser === 'chrome' && version < 72)
            return false;
        if (browser === 'firefox' && version >= 59)
            return true;
        if (!window.RTCRtpTransceiver || !('currentDirection' in RTCRtpTransceiver.prototype))
            return false;
        var tempPc;
        var supported = false;
        try {
            tempPc = new RTCPeerConnection();
            tempPc.addTransceiver('audio');
            supported = true;
        }
        catch (e) { }
        finally {
            if (tempPc) {
                tempPc.close();
            }
        }
        return supported;
    };
    class_1.prototype.toString = function () {
        return "Supports: \n    browser:" + this.getBrowser() + " \n    version:" + this.getVersion() + " \n    isIOS:" + this.isIOS + " \n    isWebRTCSupported:" + this.isWebRTCSupported() + " \n    isBrowserSupported:" + this.isBrowserSupported() + " \n    isUnifiedPlanSupported:" + this.isUnifiedPlanSupported();
    };
    return class_1;
}());
