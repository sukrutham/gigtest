import { WebElementPromise } from 'selenium-webdriver';

export class WebComponent {
  constructor(protected element: WebElementPromise, public selector: string) { }

  public async click() {
    try {
      return await this.element.click();
    } catch (exception) {
      try {
        await this.element.getDriver().executeScript('arguments[0].click();', this.element);
      } catch (jsException) {
        throw exception;
      }
    }
  }

  public async enterText(text: string) {
    return await this.element.sendKeys(text);
  }

  public async isDisplayed(): Promise<boolean> {
    try {
      return await this.element.isDisplayed();
    } catch (ex) {
      return false;
    }
  }

  public async getText() {
    return await this.element.getText();
  }

  public async mouseHover() {
    this.isDisplayed();
    return await (await this.element).getDriver().actions().mouseMove(this.element).perform();
  }

}  