const inquirer = require('inquirer');
const Table = require('cli-table');
const Game = require('./game');
var figlet = require('figlet');
const chalk = require('chalk');
const localDatabase = require('./localDatabase.json');
const {tableMainConfig, tablePaymentConfig, totalPriceTableConfig} =  require('./tableConfig');
const mainTable = new Table(tableMainConfig);
let shoppingCart = [];

localDatabase.forEach(item => {
  mainTable.push([item.name, item.year, `R$ ${item.price}`, item.id]);
});

function mainMenu() {

  console.clear();
  console.log(chalk.yellowBright(figlet.textSync('Re - Store')));
  console.log(chalk.bgYellow(chalk.black(mainTable.toString())));

  inquirer  
    .prompt([
      {
        type: 'list',
        name: 'res',
        message: 'O que deseja fazer?',
        choices: ['Adicionar jogo ao carrinho','Ver carrinho','Efetuar pagamento','Sair']
      }
    ])
    .then((answers) => {
      const { res } = answers;
      
      switch(res){
        
        case 'Adicionar jogo ao carrinho':
          cartMenu();
          break;

        case 'Ver carrinho':

        console.clear();
        const shoppingTable = new Table(tableMainConfig);
        shoppingCart.forEach(item => {
          shoppingTable.push([item.name, item.year, `R$ ${item.price}`, item.id])
        })

        console.log(chalk.yellowBright(figlet.textSync('Re - Store')));
        console.log(chalk.bgYellow(chalk.black(shoppingTable.toString())));
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'res',
              message: 'O que deseja fazer?',
              choices: ['Voltar', 'Remover item']
            }
          ]).then((answers) => {
            const { res } = answers;
            res === 'Voltar' ? mainMenu() : removeItemMenu();
          })
        break;

        case 'Efetuar pagamento':
          menuConfirmPayment();
          break;

        case 'Sair':
          console.clear();
          console.log(chalk.yellowBright(figlet.textSync('Re - Store')));
          console.log('até logo!');
          break;
      }
    })
}

function cartMenu(){
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'res',
        message: "Digite o id do jogo:"
      }
    ])
    .then((answers) => {
      const { res } = answers;
      Game.list(res)
        .then(item => shoppingCart.push(...item))
      mainMenu();
    })
} 

function menuConfirmPayment() {
  console.clear()
  let total = 0;
  const paymentDetailTable = new Table(tablePaymentConfig);

  shoppingCart.forEach(item => {
    paymentDetailTable.push([item.name, item.price])
    total += item.price;
  });

  console.log(chalk.yellowBright(figlet.textSync('Re - Store')));
  console.log(chalk.bgYellow(chalk.black(paymentDetailTable.toString())));

  const totalPriceTable = new Table(totalPriceTableConfig);
  totalPriceTable.push([total.toFixed(1)]);
  
  console.log(chalk.bgYellow(chalk.black(totalPriceTable.toString())));

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'res',
        message: 'Confirmar?',
        choices: ['sim', 'voltar']
      }
    ])
    .then((answers) => {
      const { res } = answers;

      function paymentDone(){
        console.clear();
        console.log(chalk.yellowBright(figlet.textSync('Re - Store')));
        console.log("Compra confirmada com sucesso!\nVolte sempre!");
        shoppingCart = [];
        setTimeout(function(){mainMenu()}, 3000);
      }

      res === 'voltar' ? mainMenu() : paymentDone();
      return;
    })
}

function removeItemMenu() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'res',
        message: 'Escolha o id do item que deseja remover:'
      }
    ])
    .then((answers) => {
      const { res } = answers;
      const id = res;
      const newShopp = shoppingCart.filter(item => {
        return parseInt(item.id) !== parseInt(id);
      })
      shoppingCart = [];
      shoppingCart = newShopp;
      mainMenu();
    })
}

mainMenu();