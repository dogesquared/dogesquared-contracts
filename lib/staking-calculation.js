const BN = require('bignumber.js');

const fs = require('fs');
const { stringify } = require('csv-stringify/sync');



const decimals = 18;
BN.set({
  DECIMAL_PLACES: decimals,
  ROUNDING_MODE: BN.ROUND_DOWN,
});


console.log();
const oneDaySeconds = 24 * 60 * 60;
console.log('oneDaySeconds:   ', oneDaySeconds);

const oneYearSeconds = 365 * oneDaySeconds;
console.log('oneYearSeconds:  ', oneYearSeconds);

const oneMonthSeconds = oneYearSeconds / 12;
console.log('oneMonthSeconds: ', oneMonthSeconds);


const yearsTotal = 1;
const yearCompletenessMultiplier = BN('0.0');



function main() {
  const totalSupply = BN('5000000000');

  const totalStakingPre = totalSupply.multipliedBy("0.15");
  const totalStaking = totalSupply.multipliedBy("0.15");
  console.log('totalStakingPre: ', totalStakingPre.toFixed(decimals));


  const oneYearTotal = totalSupply.multipliedBy("0.15");
  console.log('oneYearTotal:    ', oneYearTotal.toFixed(decimals));

  const rateStartSec = oneYearTotal.dividedBy(oneYearSeconds).plus('0.000000000000000001');
  console.log('rateStartSec:            ', rateStartSec.toFixed(decimals));

  const rateSecondSec = rateStartSec.multipliedBy(yearCompletenessMultiplier);
  console.log('rateSecondSec:           ', rateSecondSec.toFixed(decimals));


  let totalRewardsGlobal = BN(0);
  // Calculation by year
  {
    // csv data
    const columns = [
      'Year',
      'Rate Per Second',
      'Rate Per Day',
      'Rewards', 'Total Rewards',
      'Total Rewards Percent', 'Total',
    ];
    const records = [{
      'Year': 0,
      'Rate Per Second': 0,
      'Rate Per Day': 0,
      'Rewards': 0,
      'Total Rewards': 0,
      'Total Rewards Percent': 0.0,
      'Total': totalStaking.toFixed(decimals),
    }];


    let totalRewards = BN(0);
    let year = 0;
    let ratePerSec = rateStartSec;
    console.log();
    while (year < yearsTotal) {
      if (year === 0) {
        ratePerSec = rateStartSec;
      } else {
        ratePerSec = BN(BN(ratePerSec).multipliedBy(yearCompletenessMultiplier).toFixed(decimals));
      }

      const rewards = BN(ratePerSec.multipliedBy(oneYearSeconds).toFixed(decimals));
      totalRewards = totalRewards.plus(rewards);

      year++;
      records.push({
        'Year': year,
        'Rate Per Second': ratePerSec.toFixed(decimals),
        'Rate Per Day': ratePerSec.multipliedBy(oneDaySeconds).toFixed(decimals),
        'Rewards': rewards.toFixed(decimals),
        'Total Rewards': totalRewards.toFixed(decimals),
        'Total Rewards Percent': totalRewards.dividedBy(totalStaking).toFixed(decimals),
        'Total': totalStaking.toFixed(decimals),
      });
      console.log('year:', year, 'rewards:', rewards.toFixed(decimals));
    }
    totalRewardsGlobal = totalRewards;
    console.log();

    const csvData = stringify(
      records,
      { columns, header: true, }
    );
    fs.writeFileSync('./data/staking-by-year.csv', csvData);
  }


  // Calculation by month
  {
    // csv data
    const columns = [
      'Month',
      'Rate Per Second',
      'Rate Per Day',
      'Rate Per Month',
      'Rewards', 'Total Rewards',
      'Total Rewards Percent', 'Total',
    ];
    const records = [{
      'Month': 0,
      'Rate Per Second': 0,
      'Rate Per Day': 0,
      'Rate Per Month': 0,
      'Rewards': 0,
      'Total Rewards': 0,
      'Total Rewards Percent': 0.0,
      'Total': totalStaking.toFixed(decimals),
    }];


    let totalRewards = BN(0);
    let month = 0;
    let year = 0;
    let ratePerSec = rateStartSec;
    console.log();
    while (year < yearsTotal) {
      if (Math.floor((month * oneMonthSeconds) / oneYearSeconds) > year) {
        year++;
        ratePerSec = BN(BN(ratePerSec).multipliedBy("0.5").toFixed(decimals));
      }
      if (year >= yearsTotal) {
        continue;
      }

      const rewards = BN(ratePerSec.multipliedBy(oneMonthSeconds).toFixed(decimals));
      totalRewards = totalRewards.plus(rewards);

      month++;
      records.push({
        'Month': month,
        'Rate Per Second': ratePerSec.toFixed(decimals),
        'Rate Per Day': ratePerSec.multipliedBy(oneDaySeconds).toFixed(decimals),
        'Rate Per Month': ratePerSec.multipliedBy(oneMonthSeconds).toFixed(decimals),
        'Rewards': rewards.toFixed(decimals),
        'Total Rewards': totalRewards.toFixed(decimals),
        'Total Rewards Percent': totalRewards.dividedBy(totalStaking).toFixed(decimals),
        'Total': totalStaking.toFixed(decimals),
      });
      console.log('year:', year + 1, 'month:', month, 'rewards:', rewards.toFixed(decimals));
    }
    totalRewardsGlobal = totalRewards;
    console.log();

    const csvData = stringify(
      records,
      { columns, header: true, }
    );
    fs.writeFileSync('./data/staking-by-month.csv', csvData);
  }


  console.log('totalSupply:     ', totalSupply.toFixed(decimals));
  console.log('totalStaking:    ', totalRewardsGlobal.toFixed(decimals));
  console.log();
}

main();
