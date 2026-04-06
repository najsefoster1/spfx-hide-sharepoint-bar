import { override } from '@microsoft/decorators';
import { BaseApplicationCustomizer } from '@microsoft/sp-application-base';

export interface IHideTopBarApplicationCustomizerProperties {}

export default class HideTopBarApplicationCustomizer
  extends BaseApplicationCustomizer<IHideTopBarApplicationCustomizerProperties> {

  private _styleId: string = 'hide-suite-nav-styles';

  @override
  public onInit(): Promise<void> {

    console.log("🔥 HideTopBar loaded");

    // Run immediately
    this._injectCss();

    // Run again after page fully loads
    window.addEventListener('load', () => {
      this._injectCss();
    });

    // Run again after delay (handles SharePoint async rendering)
    setTimeout(() => {
      this._injectCss();
    }, 2000);

    return Promise.resolve();
  }

  private _injectCss(): void {

    // Prevent duplicate styles
    if (document.getElementById(this._styleId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = this._styleId;

    style.innerHTML = `
      /* 🚀 HARD TARGET - YOUR EXACT ELEMENT */
      #SuiteNavWrapper {
        display: none !important;
        height: 0 !important;
        min-height: 0 !important;
        max-height: 0 !important;
        overflow: hidden !important;
      }

      /* Backup targets */
      #SuiteNavPlaceholder,
      #O365_NavHeader {
        display: none !important;
      }

      /* Remove spacing */
      html, body, #spPageCanvasContent {
        margin-top: 0 !important;
        padding-top: 0 !important;
      }
    `;

    document.head.appendChild(style);
  }
}