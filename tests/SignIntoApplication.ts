import { specification, action, when, then } from "../generics/mocha-bdd";

import { AllPages } from "../pages";
import { Browser, ensure } from "../generics";

specification('User navigates to application', () => {
    let pages: AllPages;
    action(async () => {
      pages = new AllPages(new Browser(process.env.browser));
      await pages.home.navigate();
    });
    when('user clicks on sign in', async () => {
        then('user enters username and password', async () => {
          await pages.home.clickOnSignIn();
          await pages.login.login('abc','abcd')
        });
    });
});