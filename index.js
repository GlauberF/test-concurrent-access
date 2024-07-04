const puppeteer = require('puppeteer');

async function loginUser(url, dest, username, password) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(url);
  
  await page.waitForSelector('#username');
  await page.click('#username');
  await page.type('#username', username);
  
  await page.waitForSelector('#password');
  await page.click('#password');
  console.log(password);
  await page.type('#password', password);
  
  await page.waitForSelector('button[type="submit"]');
  await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForNavigation({ waitUntil: 'networkidle0' }) // Aguarda a navegação e ocioso de rede
  ]);

  // Redireciona para a URL de destino
  await page.goto(dest, { waitUntil: 'networkidle0' });

  // Feche o navegador se necessário
  // await browser.close();
}

async function main() {
    const url = 'http://localhost:4200/#/pages/auth/login';
    const dest = 'http://localhost:4200/#/suprimentos/estoques';
  
    const user1 = { username: 'user@test.com', password: 'password' };
    const user2 = { username: 'user2@test.com', password: 'password' };
    const user3 = { username: 'user3@test.com', password: 'password' };
    const user4 = { username: 'user4@test.com', password: 'password' };
  
    // Iniciar os logins simultaneamente
    loginUser(url, dest, user2.username, user2.password);
    loginUser(url, dest, user1.username, user1.password);
    loginUser(url, dest, user3.username, user3.password);
    loginUser(url, dest, user4.username, user4.password);
    
}

// Call
main();
