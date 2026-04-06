"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var decorators_1 = require("@microsoft/decorators");
var sp_application_base_1 = require("@microsoft/sp-application-base");
var HideTopBarApplicationCustomizer = /** @class */ (function (_super) {
    tslib_1.__extends(HideTopBarApplicationCustomizer, _super);
    function HideTopBarApplicationCustomizer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._styleId = 'hide-suite-nav-styles';
        return _this;
    }
    HideTopBarApplicationCustomizer.prototype.onInit = function () {
        var _this = this;
        console.log("🔥 HideTopBar loaded");
        // Run immediately
        this._injectCss();
        // Run again after page fully loads
        window.addEventListener('load', function () {
            _this._injectCss();
        });
        // Run again after delay (handles SharePoint async rendering)
        setTimeout(function () {
            _this._injectCss();
        }, 2000);
        return Promise.resolve();
    };
    HideTopBarApplicationCustomizer.prototype._injectCss = function () {
        // Prevent duplicate styles
        if (document.getElementById(this._styleId)) {
            return;
        }
        var style = document.createElement('style');
        style.id = this._styleId;
        style.innerHTML = "\n      /* \uD83D\uDE80 HARD TARGET - YOUR EXACT ELEMENT */\n      #SuiteNavWrapper {\n        display: none !important;\n        height: 0 !important;\n        min-height: 0 !important;\n        max-height: 0 !important;\n        overflow: hidden !important;\n      }\n\n      /* Backup targets */\n      #SuiteNavPlaceholder,\n      #O365_NavHeader {\n        display: none !important;\n      }\n\n      /* Remove spacing */\n      html, body, #spPageCanvasContent {\n        margin-top: 0 !important;\n        padding-top: 0 !important;\n      }\n    ";
        document.head.appendChild(style);
    };
    tslib_1.__decorate([
        decorators_1.override
    ], HideTopBarApplicationCustomizer.prototype, "onInit", null);
    return HideTopBarApplicationCustomizer;
}(sp_application_base_1.BaseApplicationCustomizer));
exports.default = HideTopBarApplicationCustomizer;
//# sourceMappingURL=HideTopBarApplicationCustomizer.js.map