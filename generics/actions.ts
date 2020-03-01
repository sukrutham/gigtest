import { WebElementPromise } from 'selenium-webdriver';

export class WebComponent {
  constructor(protected element: WebElementPromise, public selector: string) { }


  /**
   * this method will be helpful to click on weblement
   * if element is nto availble to click it will thow the exception 
   */
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

  /**
   * this library method will helpful to enter
   * the text into text boxes
   * @param text 
   */
  public async enterText(text: string) {
    return await this.element.sendKeys(text);
  }

  /**
   * this library method will help the webdriver 
   * to check the element is displayed or not
   */
  public async isDisplayed(): Promise<boolean> {
    try {
      return await this.element.isDisplayed();
    } catch (ex) {
      return false;
    }
  }

  /**
   * this library mwethod will helpfull 
   * to get the text 
   */
  public async getText() {
    return await this.element.getText();
  }

  /**
   * this library method will be helpfull to 
   * move the cursor on the specified element 
   */
  public async mouseHover() {
    this.isDisplayed();
    return await (await this.element).getDriver().actions().mouseMove(this.element).perform();
  }

}  