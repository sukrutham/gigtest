import { CartPage } from './CartPage';
import { SearchResultsPage } from './SearchResultsPage';
import { LoginPage } from './LogInPage';
import { Browser } from '../generics';
import { HomePage } from './HomePage';

export {
  LoginPage,
  HomePage,
  SearchResultsPage,
  CartPage
};

export class AllPages {
  public login: LoginPage;
  public home: HomePage;
  public search: SearchResultsPage;
  public cart: CartPage;


  constructor(public browser: Browser) {
    this.home = new HomePage(browser);
    this.login = new LoginPage(browser);
    this.search = new SearchResultsPage(browser);
    this.cart = new CartPage(browser);
  }

  public async dispose(): Promise<void> {
    await this.browser.close();
  }
}
