#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Computer will generate a random number.
// User Input for guessing number.
// Compare User input with Computer generate number.
// floor turn decimal figures in round .. and random generate random number
// Pin Code Generator
console.log(chalk.magentaBright("------A T M------"));
let genPin = Math.floor(Math.random() * 9090 + 1000); // random Pin generator.
console.log(chalk.bgRed(`Your Pin Code :${chalk.bgBlue(genPin)}\n`));
let cashBalance = 1500;
// const pincode = 1;
let pinAsking = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.blue("Enter Pin Number:"),
        // default: ,
    },
]);
if (pinAsking.pin === genPin) {
    console.log(chalk.bgGray("----<Pin Accepted>----"));
    let optionsList = await inquirer.prompt([
        {
            name: "operators",
            type: "list",
            message: "Selection:",
            choices: ["Balance Inquiry", "Cash Withdrawal", "Fast Cash"],
        },
    ]);
    if (optionsList.operators === "Balance Inquiry") {
        console.log("Your current balance is : " + cashBalance);
    }
    else if (optionsList.operators === "Cash Withdrawal") {
        let cashWithDraw = await inquirer.prompt([
            {
                name: "cash",
                type: "number",
                message: "Amount Required:",
            },
        ]);
        if (cashWithDraw.cash <= cashBalance) {
            console.log(`You Withdraw : ${cashWithDraw.cash}`);
            console.log(`Your Remaining Balance : ${cashBalance - cashWithDraw.cash}`);
        }
        else {
            console.log("Insufficient Balance");
        }
    }
    else if (optionsList.operators === "Fast Cash") {
        let fastCash = await inquirer.prompt([
            {
                name: "cashlist",
                type: "list",
                message: "Amount:",
                choices: [1000, 5000, 10000, 15000],
            },
        ]);
        if (cashBalance >= fastCash.cashlist) {
            cashBalance -= fastCash.cashlist;
            console.log("Withdrawal successful. New balance:", cashBalance);
        }
        else {
            console.log(chalk.red("Insufficient Balance"));
        }
    }
}
else {
    console.log("Wrong Pin\nPlease try again");
}
