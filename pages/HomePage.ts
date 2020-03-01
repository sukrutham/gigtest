import { Page, Browser, findBy, elementIsVisible, WebComponent, pageHasLoaded } from "../generics";
import { LoginPage,SearchResultsPage } from ".";


export class HomePage extends Page {
    constructor(browser: Browser) {
      super(browser);
      this.setUrl(process.env.url);
    }

    @findBy("css", "#editorial_block_center>h1")
  public homeTitle!: WebComponent;

     @findBy("css", ".login")
   public signIn!: WebComponent;
     
   @findBy("name", "search_query")
   public searchBox!: WebComponent;

   @findBy("name", "submit_search")
   public submitSearch!: WebComponent;


     public isPageLoaded() {
        return elementIsVisible(() => this.homeTitle);
      }


      public async clickOnSignIn(): Promise<void> {
        await this.signIn.click();
        await this.browser.waitAny(pageHasLoaded(LoginPage));
      }

      public async searchForProduct(productQuery:string): Promise<void> {
        await this.searchBox.enterText(productQuery);
        await this.submitSearch.click();
        await this.browser.waitAny(pageHasLoaded(SearchResultsPage));
      }


}