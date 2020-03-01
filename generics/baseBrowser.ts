import 'chromedriver';
import 'geckodriver';
import { Builder, ThenableWebDriver, WebElement, By, WebElementPromise } from 'selenium-webdriver';
import { Page, NewablePage, WebComponent, WaitCondition } from '.';

export class Browser {
  private driver: ThenableWebDriver;
  public constructor(private browserName: string='') {
    this.driver = new Builder().forBrowser(browserName).build();
  }

  public  navigate(url: string): void {
     this.driver.navigate().to(url);
  }

  public findElement(locatorType: string,locator: string): any {
    switch(locatorType) { 
      case "xpath": { 
        return this.driver.findElement(By.xpath(locator));
         break; 
      } 
      case "css": { 
        return this.driver.findElement(By.css(locator));
         break; 
      } 
      case "id": { 
        return this.driver.findElement(By.id(locator));
         break; 
      } 
      case "name": { 
        return this.driver.findElement(By.name(locator));
         break; 
      } 
      case "tag": { 
        return this.driver.findElement(By.tagName(locator));
         break; 
      } 
      default:  { 
        return console.log("please mention correct locator type");
      } 
    }

  }

  public  async clearAllCookies(url?: string): Promise<void> {
    if (url) {
      const currentUrl =  this.driver.getCurrentUrl();
       this.navigate(url);
       this.driver.manage().deleteAllCookies();
       this.navigate(await currentUrl);
    } else {
       this.driver.manage().deleteAllCookies();
    }
  }

  public  wait(condition: WaitCondition) {
     this.waitAny(condition);
  }

  public async waitAny(conditions: WaitCondition | WaitCondition[]): Promise<void> {
    const all = (!(conditions instanceof Array)) ? [ conditions ] : conditions;

    await this.driver.wait(async () => {
      for (const condition of all) {
        try {
          if (await condition(this) === true) {
            return true;
          }
          continue;
        } catch (ex) {
          continue;
        }
      }
    });
  }

  public  close(): void {
     this.driver.quit();
  }
}
