import { WebElementPromise } from 'selenium-webdriver';
import { WebComponent } from './';

class WebComponentEnsurer {
  constructor(private component: WebComponent) {
  }

  public async textIs(expected: string) {
    const text = await this.component.getText();

    if (expected.trim() !== text.trim()) {
      throw new Error(`Element ${this.component.selector} text is '${text}'. Expected value is '${expected}'`);
    }
  }

  public async isElementVisible() {
    if (!await this.component.isDisplayed()) {
      throw new Error(`Element ${this.component.selector} is visible`);
    }
  }

  public async isElementNotVisible() {
    if (await this.component.isDisplayed()) {
      throw new Error(`Element ${this.component.selector} is visible`);
    }
  }
}


export function ensure(component: WebComponent): WebComponentEnsurer;
export function ensure(component: WebComponent): any {
   if (component instanceof WebComponent) {
      return new WebComponentEnsurer(component);
  }
}
