import puppeteer, { Browser, Page } from "puppeteer";
import { dropDownMenuSelector, emailFieldSelector, hrisURL, loginButtonSelector, menuButtonSelector, passwordFieldSelector, timesheetEntrySelector, timeSheetURL } from "../configs/configs";

export const launchBrowser = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(hrisURL);
    await page.setViewport({width: 1920, height: 1080});
    return {browser, page};
}

export const closeBrowser = async (browser: Browser) => {
    await browser.close();
}

export const login = async (page: Page) => {
    if (!process.env.USERNAME || !process.env.PASSWORD) {
        throw new Error("Undefined Password or Username");
    }
    await Promise.all([
        page.waitForSelector(emailFieldSelector),
        page.waitForSelector(passwordFieldSelector),
        page.waitForSelector(loginButtonSelector)
    ]);

    await page.type(emailFieldSelector, process.env.USERNAME);
    await page.type(passwordFieldSelector, process.env.PASSWORD);
    await page.click(loginButtonSelector);
    await page.waitForNavigation();
}

export const markAttendance = async (page: Page) => {
    await page.goto(timeSheetURL);
    await page.waitForSelector(timesheetEntrySelector);
    const timesheets = await page.$$(timesheetEntrySelector);
    await timesheets[0].click();
    await page.waitForSelector(menuButtonSelector);
    const menuButton = await page.select(menuButtonSelector);
    console.log(menuButton);
    await page.click(menuButtonSelector);
    await page.waitForSelector(dropDownMenuSelector);

    // const dropDownItems = await page.$$(dropDownMenuSelector);
    // await dropDownItems[2].click();
    // await page.waitForNavigation();
}
    
