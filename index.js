const FILE_NAME = "201006";
const SSAFY_ID = "platina.kusakina@gmail.com";
const SSAFY_PWD = "Shejinchang1!";

const DIR = "4기_C반_리눅스 시스템 프로그래밍_6일차";
const MAX_PAGE = 77;
const BASE_URL = "http://edu.ssafy.com/data/upload_files/crossUpload/openLrn/ebook/unzip/A2020100609515763500/assets/page-images/page-293021-";

function num2str(num){
    let tmp = num + "";
    let len = tmp.length;
    for(let i=len; i<4; i++){
        tmp = "0" + tmp;
    }
    return tmp;
}

const puppeteer = require("puppeteer");
const crawler = async () => {
    try{
        // const browser = await puppeteer.launch({headless: true, args: ["--window-size=1920,1080"]});
        const browser = await puppeteer.launch({headless: true, args: ["--window-size=1920,1080"]});
        const page = await browser.newPage();
        // Login
        await page.setViewport({width: 1920, height: 1080})
        await page.goto("http://edu.ssafy.com/",{waitUntil: 'networkidle2'});
        await page.waitFor(5000);
        await page.evaluate(() => {
            document.querySelector("#userId").value = "platina.kusakina@gmail.com";
            document.querySelector("#userPwd").value = "Shejinchang1!";
            // document.querySelector("#userId").value = SSAFY_ID;
            // document.querySelector("#userPwd").value = SSAFY_PWD;
            document.querySelector("#wrap > div > div > div.section > form > div > div.field-set.log-in > div.form-btn > a").click();
        });
        await page.waitFor(1000);
        let links = [];
        for(let pageNo = 1; pageNo <=MAX_PAGE; pageNo++){
            links.push(`${BASE_URL}${num2str(pageNo)}.jpg`);
        }
        let pages = await Promise.all(links.map( async (li) => await browser.newPage()));
        await Promise.all(pages.map( async (page) => await page.setViewport({width: 1920, height: 1080})));
        // await Promise.all(pages.map( async (page) => await page.setViewport({width: 794, height: 1123})));
        idx = 0; await Promise.all(pages.map(async (page) => await page.goto(links[idx++], {waitUntil: "networkidle2"})));
        idx = 1; await Promise.all(pages.map((page) => page.screenshot({path: `${__dirname}/ebook/${DIR}/${FILE_NAME}_${num2str(idx++)}.jpg`, fullPage: true})));
        console.log(`files save at "${__dirname}/ebook/${DIR}/"`);
        await Promise.all(pages.map(async (page) => await page.close()));
        await page.close();
        await browser.close();
    }catch(error){
        console.log(error);
    }
}
crawler();