import { Browser, Page } from "puppeteer";

export interface IPupeteerData {
    browser: Browser,
    page: Page
}