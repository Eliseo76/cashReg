function cashRemoval(registerCashArray, denomination, changeLeftToMake) {
    // I will have to multiply all money in the cid by 100 before any math.
    let newCashOnHand = registerCashArray[1] - denomination;
    registerCashArray.splice(1, 1, newCashOnHand);
    changeLeftToMake = changeLeftToMake - denomination;
    return changeLeftToMake


}

function checkCashRegister(price, cash, cid) {
    //All money will be multiplied by 100 to get whole numbers, solve any rounding issues.
    let priceX100 = price * 100;
    let cashX100 = cash * 100;
    let currentCash = cid;
    let baseCash = [];
    let cashPriceDifference = cashX100 - priceX100;
    let registerCashArray, denomination;
    let answer = {status: "CLOSED", change: []};
    for (let i = 0; i < currentCash.length; i++) {
        let currencyChange = Math.round(currentCash[i][1] * 100);
        baseCash.push(Math.round(currentCash[i][1] * 100));
        currentCash[i].splice(1, 1, currencyChange);
        // console.log(currentCash);
    }

    while (cashPriceDifference > 0) {

        if (cashPriceDifference >= 10000 && currentCash[8][1] > 0) {
            registerCashArray = currentCash[8];
            denomination = 10000;
            cashPriceDifference = cashRemoval(registerCashArray, denomination, cashPriceDifference);


        } else if (cashPriceDifference >= 2000 && currentCash[7][1] > 0) {
            registerCashArray = currentCash[7];
            denomination = 2000;
            cashPriceDifference = cashRemoval(registerCashArray, denomination, cashPriceDifference);

        } else if (cashPriceDifference >= 1000 && currentCash[6][1] > 0) {
            registerCashArray = currentCash[6];
            denomination = 1000;
            cashPriceDifference = cashRemoval(registerCashArray, denomination, cashPriceDifference);

        } else if (cashPriceDifference >= 500 && currentCash[5][1] > 0) {
            registerCashArray = currentCash[5];
            denomination = 500;
            cashPriceDifference = cashRemoval(registerCashArray, denomination, cashPriceDifference);

        } else if (cashPriceDifference >= 100 && currentCash[4][1] > 0) {
            registerCashArray = currentCash[4];
            denomination = 100;
            cashPriceDifference = cashRemoval(registerCashArray, denomination, cashPriceDifference);

        } else if (cashPriceDifference >= 25 && currentCash[3][1] > 0) {
            registerCashArray = currentCash[3];
            denomination = 25;
            cashPriceDifference = cashRemoval(registerCashArray, denomination, cashPriceDifference);

        } else if (cashPriceDifference >= 10 && currentCash[2][1] > 0) {
            registerCashArray = currentCash[2];
            denomination = 10;
            cashPriceDifference = cashRemoval(registerCashArray, denomination, cashPriceDifference);

        } else if (cashPriceDifference >= 5 && currentCash[1][1] > 0) {
            registerCashArray = currentCash[1];
            denomination = 5;
            cashPriceDifference = cashRemoval(registerCashArray, denomination, cashPriceDifference);

        } else if (cashPriceDifference >= 1 && currentCash[0][1] > 0) {
            registerCashArray = currentCash[0];
            denomination = 1;
            cashPriceDifference = cashRemoval(registerCashArray, denomination, cashPriceDifference);

        } else {
            answer.status = "INSUFFICIENT_FUNDS";
            console.log(answer);
            return answer;
        }


    }
    let closecount = 0;
    //t need to change the dollar amounts back to decimal points and need to add
    //  todo RETURN {status : "OPEN" OR "CLOSED" OR "INSUFFICIENT_FUNDS" and , change:[["TEN",20],["FIVE", 15] IN HIGH TO LOW]}
    for (let i = cid.length - 1; i >= 0; i--) {
        let difference, changeAmount;


        if (currentCash[i][1] === 0) {
            closecount++;
            difference = baseCash[i] - currentCash[i][1];
            answer.status = "OPEN";
            changeAmount = [currentCash[i][0], difference / 100];
            answer.change.push(changeAmount);
        } else if (baseCash[i] > currentCash[i][1]) {

            difference = baseCash[i] - currentCash[i][1];
            answer.status = "OPEN";
            changeAmount = [currentCash[i][0], difference / 100];
            answer.change.push(changeAmount);
        }



    }
    let closedAnswer = [];
    let closing = function () {
        answer.status = "CLOSED";
        for (let i = 0; i<answer.change.length; i++) {
            closedAnswer.unshift(answer.change[i]);

        }
        answer.change = closedAnswer;

    };
    if (closecount === cid.length ) {
        closing();
    }
        // Here is your change, ma'am.
    console.log(answer);
        return answer;

    }


// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]
checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
// checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
// checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
// checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
// checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);