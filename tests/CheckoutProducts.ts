import { specification, action, when, then } from "../generics/mocha-bdd";

import { AllPages } from "../pages";
import { Browser, ensure } from "../generics";

specification('User navigates to application', () => {
    let pages: AllPages;
    action(async () => {
        pages = new AllPages(new Browser(process.env.browser));
        await pages.home.navigate();
    });
    when('user search for products', async () => {
        then('user selects the products', async () => {
            await pages.home.searchForProduct("black dress");
            await pages.search.addProducts();
        });
        then('user checkouts the products', async () => {
            await pages.cart.checkoutProducts();
        });
    });
});