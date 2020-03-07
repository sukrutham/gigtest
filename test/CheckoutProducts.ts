import { specification, action, when, then } from "../generics/mocha-bdd";
import { AllPages } from "../pages";
import { Browser, ensure } from "../generics";
import * as dotenv from "dotenv";

dotenv.config();

specification('User navigates to application', () => {
    let pages: AllPages;
    action(async () => {
        pages = new AllPages(new Browser(process.env.BROWSER));
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