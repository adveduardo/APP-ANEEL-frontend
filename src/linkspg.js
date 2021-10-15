const puppeteer = require("puppeteer");
const urlAlvo = 'https://rs.olx.com.br/regioes-de-pelotas-rio-grande-e-bage/imoveis';

async function linkspg(url) {
    const dados = [];
    const browser = await puppeteer.launch({
        //headless: false
    });
    const page = await browser.newPage();


    await page.goto(`${url}`);
    const options = await page.$$eval(".sc-1fcmfeb-1.kntIvV > li >a", (opts) =>
        opts.map((option) => option.attributes[6].nodeValue)
    );
    //console.log(options);
    await options.map((lnk) => {
        const olnk = lnk
        dados.push(olnk);
    });
    // await console.log(dados);
//   console.log(dados)
    return dados
    //await browser.close();

}

//linkimoveis(urlAlvo);

module.exports=linkspg;