const { readFile, writeFile } = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Game {
  constructor() {
    this.LOCAL_DATABASE = 'localDatabase.json';
  }

  async getDataFile(){
    const file = await readFileAsync(this.LOCAL_DATABASE,'utf8');
    return JSON.parse(file.toString());
  }

  async write(data) {
    await writeFileAsync(this.LOCAL_DATABASE, JSON.stringify(data)); 
    return true;
  }

  async list(id) {
    const data = await this.getDataFile();
    const dataFiltered = data.filter(item =>  ( id ? (item.id === id): true ));
    return dataFiltered;
  }

  async storeGame(game){
    const games = await this.getDataFile();
    const id = game.id === undefined ?  Date.now() : game.id                                   
    const gameTostore = {
      id,
      ...game
    };

    const allGames = [
      gameTostore,
      ...games
    ];

    const resultado = await this.write(allGames)
    return resultado;

  }

  async delete(id) {
    if(!id) {
      await this.write([]);
      return;
    }

    const data =  await this.list();
    const index = data.findIndex(item => item.id === parseInt(id));
    if(index === -1){
      throw Error("game not found");
    }

    const result = data.splice(index, 1);
    return await this.write(result);
  }

  async update(id, updates){
    if(!id || !updates){
      throw Error("can't update this game");
    }

    const data = await this.list();
    const index = data.findIndex(item => item.id === parseInt(id));

    if(index === -1 ) {
      throw Error("this game doesn't exist");
    }

    const actual = data[index];
    const newGame = {
      ...actual,
      ...updates
    }

    await this.delete(data[index].id);
    const result = await this.storeGame(newGame)
    return result;
  }
}

module.exports = new Game();
