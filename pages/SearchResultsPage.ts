import { Page, Browser, findBy, WebComponent, elementIsVisible, pageHasLoaded } from "../generics";
import { CartPage } from ".";

export class SearchResultsPage extends Page {
    constructor(browser: Browser) {
        super(browser);
    }

    @findBy('css', '.page-heading.product-listing')
    public pageHeading!: WebComponent;

    @findBy('xpath', "(//div[@class='product-image-container'])[1]")
    public firstProduct!: WebComponent;

    @findBy('xpath', "(//div[@class='product-image-container'])[2]")
    public secondProduct!: WebComponent;

    @findBy('css', "[title='Add to cart']")
    public addToCart!: WebComponent;

    @findBy('css', ".continue.btn")
    public continueShopping!: WebComponent;

    @findBy('css', "[title='Proceed to checkout']")
    public proceedToCheckout!: WebComponent;


    public isPageLoaded() {
        return elementIsVisible(() => this.pageHeading);
    }

    public async addProducts() {
        await this.firstProduct.mouseHover();
        await this.addToCart.click();
        await this.secondProduct.mouseHover();
        await this.addToCart.click();
        await this.proceedToCheckout.click();
        await this.browser.waitAny(pageHasLoaded(CartPage));

    }

}