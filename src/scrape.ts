import axios from 'axios';
import cheerio from 'cheerio';

interface ScrapedData {
    id: string;
    announcementLink: string;
    announcementText: string;
    customer: string;
    item: string;
    quantity: number;
    price: number;
    purchaseMethod: string;
    status: string;
}

async function scrapeData(url: string): Promise<ScrapedData[]> {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const data: ScrapedData[] = [];

        $('tr').each((index, element) => {
            const id = $(element).find('td strong').first().text();
            const announcementLink = $(element).find('td a').first().attr('href') || '';
            const announcementText = $(element).find('td a').first().text();
            const customer = $(element).find('td small b').text() + $(element).find('td small').html()?.split('<br>')[1].trim() || '';
            const item = $(element).find('td a').eq(1).text();
            const quantity = parseInt($(element).find('td.text-center').text(), 10);
            const price = parseFloat($(element).find('td').eq(4).text().replace(/[^\d.-]/g, ''));
            const purchaseMethod = $(element).find('td').eq(5).text();
            const status = $(element).find('td').eq(6).text();

            data.push({
                id,
                announcementLink,
                announcementText,
                customer,
                item,
                quantity,
                price,
                purchaseMethod,
                status
            });
        });

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

const url = 'https://www.goszakup.gov.kz/ru/search/lots';

scrapeData(url).then(data => {
    console.log(data);
}).catch(error => {
    console.error('Error:', error);
});
