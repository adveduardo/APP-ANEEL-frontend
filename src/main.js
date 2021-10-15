//Extrai dados individuais  de pagina

const puppeteer = require('puppeteer');
const linkspg = require('./linkspg');
let detalhesImovel = [];
const urlalvo = 'https://rs.olx.com.br/regioes-de-pelotas-rio-grande-e-bage/imoveis';
const main = async () =>{
     const browser = await puppeteer.launch({
     // headless: false,
  });
  const page = await browser.newPage();
   const urls = await linkspg(urlalvo);
   for(let i=0 ; i< urls.length; ++i){
         const url = urls[i];
           await page.goto(url);
   await page.waitForTimeout(3000);
  const nome = await page.$eval ('.sc-45jt43-0.eCghYu.sc-ifAKCX.cmFKIN', (el) => el.textContent);
  const valor = await page.$eval ('.sc-1wimjbb-0.JzEH.sc-ifAKCX.cmFKIN', (el) => el.textContent);
  const codigobruto = await page.$eval ('.sc-16iz3i7-0.qJvUT.sc-ifAKCX.fizSrB', (el) => el.textContent);
  const codigo = codigobruto.replace(/\D/gim,''); //Limpa string de conteudo - tira letras
  const urlimovel = urlalvo;

  //busca informações e traz numero muitas vezes
  page.waitFor('.sc-57pm5w-0.XtcoW')
  await page.click('.sc-57pm5w-0.XtcoW')
  const Inf = await page.$eval ('.sc-1sj3nln-1.eOSweo.sc-ifAKCX.cmFKIN', (el) => el.textContent);
  const informativo = Inf.replace(/\n/gim,''); //Limpa string espaço

  //array
 const detalhesArray = await page.$$('.duvuxf-0.h3us20-0.jyICCp');
 for (let detalhesElement of detalhesArray) {
    let detalhesImv = await detalhesElement.$eval('.sc-hmzhuo.sc-1f2ug0x-3.ONRJp.sc-jTzLTM.iwtnNi', element => element.innerText)
    const detalhes = await detalhesImv.replace( '\n' , ' : ');
    detalhesImovel.push(detalhes);
 }
   
 //console.log (dados)
 console.log({nome, valor, urlimovel, codigo, informativo, detalhesImovel});
};
  await browser.close();
   }
  // console.log(urls)

main()
// const urlalvo = 'https://rs.olx.com.br/regioes-de-pelotas-rio-grande-e-bage/terrenos/r-162-vendo-71-hectares-otima-para-pecuaria-proximo-a-quinta-rg-523887401'
// let detalhesImovel = [];


// (async () => {
//   const browser = await puppeteer.launch({
//      // headless: false,
//   });
//   const page = await browser.newPage();
//   await page.goto(urlalvo);
//   const nome = await page.$eval ('.sc-45jt43-0.eCghYu.sc-ifAKCX.cmFKIN', (el) => el.textContent);
//   const valor = await page.$eval ('.sc-1wimjbb-0.JzEH.sc-ifAKCX.cmFKIN', (el) => el.textContent);
//   const codigobruto = await page.$eval ('.sc-16iz3i7-0.qJvUT.sc-ifAKCX.fizSrB', (el) => el.textContent);
//   const codigo = codigobruto.replace(/\D/gim,''); //Limpa string de conteudo - tira letras
//   const urlimovel = urlalvo;

//   //busca informações e traz numero muitas vezes
//   page.waitFor('.sc-57pm5w-0.XtcoW')
//   await page.click('.sc-57pm5w-0.XtcoW')
//   const Inf = await page.$eval ('.sc-1sj3nln-1.eOSweo.sc-ifAKCX.cmFKIN', (el) => el.textContent);
//   const informativo = Inf.replace(/\n/gim,''); //Limpa string espaço


//   //array
//  const detalhesArray = await page.$$('.duvuxf-0.h3us20-0.jyICCp');
//  for (let detalhesElement of detalhesArray) {
//     let detalhesImv = await detalhesElement.$eval('.sc-hmzhuo.sc-1f2ug0x-3.ONRJp.sc-jTzLTM.iwtnNi', element => element.innerText)
//     const detalhes = await detalhesImv.replace( '\n' , ' : ');
//     detalhesImovel.push(detalhes);
//  }
   
//  //console.log (dados)
// console.log({nome, valor, urlimovel, codigo, informativo, detalhesImovel});
//   await browser.close();
// })();