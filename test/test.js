const { deepStrictEqual } = require('assert');
const Game = require('../Game');

const DEFAULT_GAME_TO_STORE = {
  name: 'Resident Evil',
  year: '1996',
  id: 1
};

const DEFAULT_GAME_TO_UPDATE = {
  name: 'Resident Evil 2',
  year: '1999',
  id: 2
}

describe("Test suite for game management", () => {
  
  beforeEach(async () => {
    await Game.storeGame(DEFAULT_GAME_TO_STORE);
    await Game.storeGame(DEFAULT_GAME_TO_UPDATE);  
  });

  afterEach(async () => {
    await Game.delete();
  });

  it("Should be able to find a game", async () => {
    const expected = DEFAULT_GAME_TO_STORE;
    const [result] = await Game.list(DEFAULT_GAME_TO_STORE.id);
    deepStrictEqual(expected, result);
  })

  it("Should be able to store a game", async () => {
    const expected = DEFAULT_GAME_TO_STORE;
    await Game.storeGame(DEFAULT_GAME_TO_STORE);
    const [result] = await Game.list(DEFAULT_GAME_TO_STORE.id);
    deepStrictEqual(expected, result);
  });

  it("Should be able to delete a game by id", async () => {
    const expected =  true;
    const resultado = await Game.delete(DEFAULT_GAME_TO_STORE.id);
    deepStrictEqual(resultado, expected );
  });

  it("Should be able to update a game by id", async () => {
    const expected = {
      ...DEFAULT_GAME_TO_UPDATE,
      year: "1998",
      name: "Resident Evil 2 - Director's Cut"
    }

    const update = {
      year: "1998",
      name: "Resident Evil 2 - Director's Cut"
    }

    await Game.update(DEFAULT_GAME_TO_UPDATE.id, update);
    const [result] = await Game.list(DEFAULT_GAME_TO_UPDATE.id);
    deepStrictEqual(result, expected);
  });
})