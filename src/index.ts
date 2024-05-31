import 'dotenv/config';
import { closeBrowser, launchBrowser, login, markAttendance } from './utils/pupeteer'; 
import { IPupeteerData } from './types';

const run = async () => {
    let data: IPupeteerData | undefined = undefined;
    try {
        data = await launchBrowser();  
        await login(data.page); 
        await markAttendance(data.page);
    } catch (e) {
        console.log("Error: ", e);
    } finally {
        if (data && data.browser) {
            setTimeout(async () => {
                await closeBrowser(data!.browser);
            }, 5000)
        }
    }
}

run();