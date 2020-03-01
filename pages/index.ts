import { LoginPage } from './LogInPage';
import { Browser } from '../generics';
import { HomePage } from './HomePage';

export {
  LoginPage,
  HomePage,
};

export class AllPages {
    public login: LoginPage;
    public home: HomePage;

    constructor(public browser: Browser) {
      this.home = new HomePage(browser);
      this.login = new LoginPage(browser);
    }

    public async dispose(): Promise<void> {
      await this.browser.close();
    }
}
