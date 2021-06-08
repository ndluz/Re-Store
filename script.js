const Game =  require('./game');
const games = [
  {
    name: "Resident Evil",
    year: "1996",
    price: 33.50,
    id: "1"
  },
  {
    name: "Resident Evil 2",
    year: "1998",
    price: 43.20,
    id: "2"
  },
  {
    name: "Resident Evil 3: Nemesis",
    year: "1999",
    price: 55.10,
    id: "3"
  },
  {
    name: "Resident Evil – Code: Veronica",
    year: "2000",
    price: 60.00,
    id: "4"
  },
  {
    name: "Resident Evil Zero",
    year: "2002",
    price: 80.00,
    id: "5"
  },
  {
    name: "Resident Evil 4",
    year: "2005",
    price: 100.10,
    id: "6"
  },
  {
    name: "Resident Evil 5",
    year: "2009",
    price: 125.90,
    id: "7"
  },
  {
    name: "Resident Evil 6",
    year: "2012",
    price: 150.00,
    id: "8"
  },
  {
    name: "Resident Evil 7: Biohazard",
    year: "2017",
    price: 200.00,
    id: "9"
  },
  {
    name: "Resident Evil 8: Village",
    year: "2021",
    price: 230.99,
    id: "10"
  }
]

async function storeGame(games) {
  for(item in games) {
    await Game.storeGame(games[item])
  }
}

storeGame(games)
