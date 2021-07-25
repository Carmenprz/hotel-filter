const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
    
        await page.goto('https://www.book-secure.com/index.php?s=results&group=ascentral&property=thphu18547&arrival=2022-02-08&departure=2022-02-10&adults1=2&children1=1&childrenAges1=1&locale=es_ES&currency=THB&stid=gclq71umt&Clusternames=ascentral&cluster=ascentral&Hotelnames=Asia-Centara-Grand-Beach-Resort-Phuket&hname=Asia-Centara-Grand-Beach-Resort-Phuket&arrivalDateValue=2022-02-08&frommonth=2&fromday=8&fromyear=2022&nbdays=2&nbNightsValue=2&adulteresa=2&nbAdultsValue=2&enfantresa=1&nbChildrenValue=1&redir=BIZ-so5523q0o4&rt=1627046485');
        await page.waitForSelector('.fb-date');
    
        const hotelFilter = await page.evaluate(() => {
    
            const data = {};
    
            let checkIn = document.querySelector('#fb-qs-summary-dates-arrival span');
            checkIn = checkIn.dataset.date;
            data["check-in date"] = checkIn;
            
            let checkOut = document.querySelector('#fb-qs-summary-dates-departure span');
            checkOut = checkOut.dataset.date;
            data["check-out date"] = checkOut;
    
            let numRooms = document.querySelector('#fb-qs-summary-rooms-quantity span');
            numRooms = numRooms.dataset.mode;
            data["number of rooms"] = Math.abs(numRooms);
    
            let numAdults = document.querySelector('#fb-qs-summary-rooms-adults span');
            numAdults = numAdults.dataset.mode;
            data["number of adults"] = numAdults;
    
            let numChildren = document.querySelector('#fb-qs-summary-rooms-children span');
            numChildren = numChildren.dataset.mode;
            data["number of children"] = numChildren;
    
            let numGuests  = Math.abs(numAdults) + Math.abs(numChildren);
            data["total guests"] = numGuests;
    
            let language = document.documentElement.lang;
            data["language used"] = language;
            
            return data;
        });
    
        console.log(hotelFilter);
    
        await browser.close();

    } catch (err) {
        console.error(err)
    }
}) ();

