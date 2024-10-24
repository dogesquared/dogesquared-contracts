const BN = require('bignumber.js');

const fs = require('fs');
const { parse } = require('csv-parse/sync');



const decimals = 18;
BN.set({
  DECIMAL_PLACES: decimals,
  ROUNDING_MODE: BN.ROUND_DOWN,
});



const presaleStartTimeMs = new Date("2024-10-23T17:00:00.000Z").getTime();
console.log('presaleStart sec:', Math.floor(presaleStartTimeMs / 1000))
const presaleStepDurationMs = 2 * 24 * 60 * 60 * 1000; // 2 days


function main() {
  const rawData = fs.readFileSync("./lib/SCHEDULE.csv", { encoding: "utf8", });
  const rows = parse(rawData, { columns: true, });


  const rounds = [[], [], []];
  // rounds[0] - stage amount without decimals (100.0 => 100)
  // rounds[1] - stage price with decimals (0.001 => 1000000000000000)
  // rounds[2] - stage end time

  const amounts = [];
  const prices = [];
  const pricesDecs = [];
  const endTimes = [];
  for (let i in rows) {
    let step = parseInt(rows[i]['STEP'].replaceAll(",", ""));
    if (!isNaN(step)) {
      const amount = parseInt(rows[i]['SCHEDULE'].replaceAll(",", "")).toFixed(0);
      amounts.push(amount);

      const priceDec = new BN(rows[i]['PRICE, USD']);
      pricesDecs.push(priceDec.multipliedBy("1000000000000000000").toFixed(0));
      const price = priceDec.multipliedBy("1000000000000000000").toFixed(0);
      prices.push(priceDec.toString());

      const endTime = Math.floor(
        (presaleStartTimeMs + presaleStepDurationMs * step) / 1000
      ).toFixed(0)
      endTimes.push(parseInt(endTime));

      rounds[0].push(amount);
      rounds[1].push(price);
      rounds[2].push(endTime);
    }
  }
  console.log("amounts:\n", JSON.stringify(amounts));
  console.log("prices:\n", JSON.stringify(prices));
  console.log("pricesDecs:\n", JSON.stringify(pricesDecs));
  console.log("endTimes:\n", JSON.stringify(endTimes));

  const roundsStr = JSON.stringify(rounds).replaceAll('"', '');
  //console.log("rounds:", roundsStr);

  if (!fs.existsSync("./data")) {
    fs.mkdirSync("./data");
  }
  fs.writeFileSync("./data/rounds.txt", roundsStr);
  fs.writeFileSync("./data/rounds.json", JSON.stringify(rounds, null, 2));
}

main();
