import { Browser, Page, WebComponent, findBy, elementIsVisible, pageHasLoaded } from "../generics";
import { LoginPage } from ".";

export class CartPage extends Page {
    constructor(browser: Browser) {
        super(browser);
    }

    @findBy('css', '.page-heading')
    public pageHeading!: WebComponent;

    @findBy('xpath', "(//a[@title='Add'])[2]")
    public increaseSecondProductQuantity!: WebComponent;

    @findBy('xpath', "(//td[@data-title='Delete'])[1]")
    public deleteFirstProduct!: WebComponent;

    @findBy('xpath', "(//a[@title='Proceed to checkout'])[2]")
    public proceedToCheckout!: WebComponent;


    public isPageLoaded() {
        return elementIsVisible(() => this.pageHeading);
    }

    public async checkoutProducts() {
        await this.increaseSecondProductQuantity.click();
        await this.deleteFirstProduct.click();
        await this.proceedToCheckout.click();
        await this.browser.waitAny(pageHasLoaded(LoginPage));
    }

}