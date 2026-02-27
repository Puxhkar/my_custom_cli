#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const axios_1 = __importDefault(require("axios"));
const chalk_1 = __importDefault(require("chalk"));
const os = __importStar(require("os"));
// ==========================================
// VALIDATION LAYER
// ==========================================
class Validator {
    static isNumber(val) {
        return !isNaN(parseFloat(val));
    }
    static isValidUsername(username) {
        // GitHub usernames can only contain alphanumeric characters or hyphens
        const regex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
        return regex.test(username);
    }
}
// ==========================================
// COMMAND CLASSES
// ==========================================
class GreetCommand {
    execute(name, options) {
        let greeting = `Hello, ${name || 'user'}! Welcome to mycli!`;
        if (options.uppercase)
            greeting = greeting.toUpperCase();
        console.log(chalk_1.default.green(greeting));
    }
}
class AddCommand {
    execute(num1, num2) {
        if (!Validator.isNumber(num1) || !Validator.isNumber(num2)) {
            return console.log(chalk_1.default.red('Validation Error: Both arguments must be valid numbers.'));
        }
        console.log(chalk_1.default.yellow(`The sum is ${parseFloat(num1) + parseFloat(num2)}`));
    }
}
class SubtractCommand {
    execute(num1, num2) {
        if (!Validator.isNumber(num1) || !Validator.isNumber(num2)) {
            return console.log(chalk_1.default.red('Validation Error: Both arguments must be valid numbers.'));
        }
        console.log(chalk_1.default.yellow(`The difference is ${parseFloat(num1) - parseFloat(num2)}`));
    }
}
class MultiplyCommand {
    execute(num1, num2) {
        if (!Validator.isNumber(num1) || !Validator.isNumber(num2)) {
            return console.log(chalk_1.default.red('Validation Error: Both arguments must be valid numbers.'));
        }
        console.log(chalk_1.default.yellow(`The product is ${parseFloat(num1) * parseFloat(num2)}`));
    }
}
class DivideCommand {
    execute(num1, num2) {
        if (!Validator.isNumber(num1) || !Validator.isNumber(num2)) {
            return console.log(chalk_1.default.red('Validation Error: Both arguments must be valid numbers.'));
        }
        const b = parseFloat(num2);
        if (b === 0)
            return console.log(chalk_1.default.red('Validation Error: Division by zero is not allowed.'));
        console.log(chalk_1.default.yellow(`The quotient is ${parseFloat(num1) / b}`));
    }
}
class JokeCommand {
    async execute() {
        try {
            const { data } = await axios_1.default.get('https://official-joke-api.appspot.com/random_joke');
            console.log(chalk_1.default.magenta(`${data.setup}`));
            setTimeout(() => {
                console.log(chalk_1.default.cyan(`   ${data.punchline} 😄`));
            }, 1000);
        }
        catch (err) {
            console.log(chalk_1.default.red('Could not fetch a joke. Check your internet.'));
        }
    }
}
class GitHubCommand {
    async execute(username) {
        var _a, _b;
        if (!Validator.isValidUsername(username)) {
            return console.log(chalk_1.default.red(`Validation Error: "${username}" is not a valid GitHub username format.`));
        }
        try {
            const { data } = await axios_1.default.get(`https://api.github.com/users/${encodeURIComponent(username)}`);
            console.log(chalk_1.default.green(`\nGitHub User: ${data.login}`));
            console.log(`   Name        : ${(_a = data.name) !== null && _a !== void 0 ? _a : 'N/A'}`);
            console.log(`   Bio         : ${(_b = data.bio) !== null && _b !== void 0 ? _b : 'N/A'}`);
            console.log(`   Public Repos: ${data.public_repos}`);
            console.log(`   Followers   : ${data.followers}`);
            console.log(chalk_1.default.cyan(`   Profile     : ${data.html_url}\n`));
        }
        catch (err) {
            console.log(chalk_1.default.red(`GitHub user "${username}" not found.`));
        }
    }
}
class QuoteCommand {
    async execute() {
        try {
            const { data } = await axios_1.default.get('https://dummyjson.com/quotes/random');
            console.log(chalk_1.default.cyan(`\n"${data.quote}"`));
            console.log(chalk_1.default.gray(`           — ${data.author}\n`));
        }
        catch (err) {
            console.log(chalk_1.default.red('Could not fetch a quote. Check your internet.'));
        }
    }
}
class WeatherCommand {
    async execute(city) {
        try {
            const { data } = await axios_1.default.get(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
            const current = data.current_condition[0];
            console.log(chalk_1.default.green(`\nWeather in ${city}:`));
            console.log(chalk_1.default.cyan(`   Temperature : ${current.temp_C}°C / ${current.temp_F}°F`));
            console.log(chalk_1.default.yellow(`   Condition   : ${current.weatherDesc[0].value}`));
            console.log(chalk_1.default.magenta(`   Humidity    : ${current.humidity}%\n`));
        }
        catch (err) {
            console.log(chalk_1.default.red(`Could not fetch weather for "${city}".`));
        }
    }
}
class SysinfoCommand {
    execute() {
        console.log(chalk_1.default.blue('\nSystem Information:'));
        console.log(chalk_1.default.cyan(`   OS Platform : ${os.platform()}`));
        console.log(chalk_1.default.cyan(`   CPU Arch    : ${os.arch()}`));
        console.log(chalk_1.default.cyan(`   Node Version: ${process.version}`));
        const tb = os.totalmem() / 1024 / 1024 / 1024;
        const fb = os.freemem() / 1024 / 1024 / 1024;
        console.log(chalk_1.default.magenta(`   Memory      : ${fb.toFixed(2)} GB free / ${tb.toFixed(2)} GB total\n`));
    }
}
class CoinFlipCommand {
    execute() {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
        console.log(chalk_1.default.yellow(`The coin landed on: ${chalk_1.default.bold(result)}`));
    }
}
class RollDiceCommand {
    execute() {
        const roll = Math.floor(Math.random() * 6) + 1;
        console.log(chalk_1.default.yellow(`You rolled a ${chalk_1.default.bold(roll)}`));
    }
}
class Base64Command {
    execute(action, text) {
        if (action === 'encode') {
            const encoded = Buffer.from(text).toString('base64');
            console.log(chalk_1.default.green(`Encoded: ${encoded}`));
        }
        else if (action === 'decode') {
            const decoded = Buffer.from(text, 'base64').toString('utf8');
            console.log(chalk_1.default.green(`Decoded: ${decoded}`));
        }
        else {
            console.log(chalk_1.default.red('Error: Action must be "encode" or "decode"'));
        }
    }
}
const program = new commander_1.Command();
program.name('mycli').version('1.0.0', '-v, --version', 'Output the current version');
program
    .command('greet <name>')
    .description('Greet a user by name (Supports flags)')
    .option('-u, --uppercase', 'Force the greeting to be uppercase')
    .action((name, options) => new GreetCommand().execute(name, options));
program
    .command('add <num1> <num2>')
    .description('Add two numbers')
    .action((num1, num2) => new AddCommand().execute(num1, num2));
program
    .command('subtract <num1> <num2>')
    .description('Subtract the second number from the first')
    .action((num1, num2) => new SubtractCommand().execute(num1, num2));
program
    .command('multiply <num1> <num2>')
    .description('Multiply two numbers')
    .action((num1, num2) => new MultiplyCommand().execute(num1, num2));
program
    .command('divide <num1> <num2>')
    .description('Divide the first number by the second')
    .action((num1, num2) => new DivideCommand().execute(num1, num2));
program
    .command('hasao')
    .description('Fetch a random joke from the internet')
    .action(() => new JokeCommand().execute());
program
    .command('github <username>')
    .description('Fetch GitHub user info')
    .action((username) => new GitHubCommand().execute(username));
program
    .command('quote')
    .description('Fetch a random inspirational quote')
    .action(() => new QuoteCommand().execute());
program
    .command('weather <city>')
    .description('Fetch current weather conditions')
    .action((city) => new WeatherCommand().execute(city));
program
    .command('sysinfo')
    .description('Show system and OS usage stats')
    .action(() => new SysinfoCommand().execute());
program
    .command('flip')
    .description('Flip a coin - heads or tails?')
    .action(() => new CoinFlipCommand().execute());
program
    .command('roll')
    .description('Roll a dice (1-6)')
    .action(() => new RollDiceCommand().execute());
program
    .command('base64 <action> <text>')
    .description('Encode or decode Base64 strings (action: encode|decode)')
    .action((action, text) => new Base64Command().execute(action, text));
program.parse();
