import { WebComponent } from '../generics/actions';
import { findBy, Page, elementIsVisible, Browser, pageHasLoaded } from "../generics";
import { HomePage } from '.';

export class LoginPage extends Page {
  constructor(browser: Browser) {
    super(browser);
  }

    @findBy('css', '.page-heading')
  public pageHeading!: WebComponent;

    @findBy('css', '.#email')
  public emailTextbox!: WebComponent;

    @findBy('id', 'passwd')
  public passwordTextbox!: WebComponent;

    @findBy('name', 'SubmitLogin')
  public signInButton!: WebComponent;


    public isPageLoaded() {
        return elementIsVisible(() => this.pageHeading);
      }

      public async login(userName:string,password:string){
        await this.emailTextbox.enterText(userName);
        await this.passwordTextbox.enterText(password);
        await this.signInButton.click();
        await this.browser.waitAny(pageHasLoaded(HomePage));
      }
}

