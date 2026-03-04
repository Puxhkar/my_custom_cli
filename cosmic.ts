#!/usr/bin/env node
import { Command } from 'commander';
import axios from 'axios';
import chalk from 'chalk';
import * as os from 'os';

interface ICommand {
    execute(...args: any[]): void | Promise<void>;
}

// ==========================================
// VALIDATION LAYER
// ==========================================
class Validator {
    static isNumber(val: string): boolean {
        return !isNaN(parseFloat(val));
    }

    static isValidUsername(username: string): boolean {
        // GitHub usernames can only contain alphanumeric characters or hyphens
        const regex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
        return regex.test(username);
    }
}

// ==========================================
// COMMAND CLASSES
// ==========================================
class GreetCommand implements ICommand {
    execute(name: string, options: { uppercase?: boolean, rainbow?: boolean }) {
        let greeting = `Hello, ${name || 'user'}! Welcome to mycli!`;
        if (options.uppercase) greeting = greeting.toUpperCase();
        console.log(chalk.green(greeting));
    }
}

class AddCommand implements ICommand {
    execute(num1: string, num2: string) {
        if (!Validator.isNumber(num1) || !Validator.isNumber(num2)) {
            return console.log(chalk.red('Validation Error: Both arguments must be valid numbers.'));
        }
        console.log(chalk.yellow(`The sum is ${parseFloat(num1) + parseFloat(num2)}`));
    }
}

class SubtractCommand implements ICommand {
    execute(num1: string, num2: string) {
        if (!Validator.isNumber(num1) || !Validator.isNumber(num2)) {
            return console.log(chalk.red('Validation Error: Both arguments must be valid numbers.'));
        }
        console.log(chalk.yellow(`The difference is ${parseFloat(num1) - parseFloat(num2)}`));
    }
}

class MultiplyCommand implements ICommand {
    execute(num1: string, num2: string) {
        if (!Validator.isNumber(num1) || !Validator.isNumber(num2)) {
            return console.log(chalk.red('Validation Error: Both arguments must be valid numbers.'));
        }
        console.log(chalk.yellow(`The product is ${parseFloat(num1) * parseFloat(num2)}`));
    }
}

class DivideCommand implements ICommand {
    execute(num1: string, num2: string) {
        if (!Validator.isNumber(num1) || !Validator.isNumber(num2)) {
            return console.log(chalk.red('Validation Error: Both arguments must be valid numbers.'));
        }
        const b = parseFloat(num2);
        if (b === 0) return console.log(chalk.red('Validation Error: Division by zero is not allowed.'));
        console.log(chalk.yellow(`The quotient is ${parseFloat(num1) / b}`));
    }
}

class JokeCommand implements ICommand {
    async execute() {
        try {
            const { data } = await axios.get('https://official-joke-api.appspot.com/random_joke');
            console.log(chalk.magenta(`${data.setup}`));
            setTimeout(() => {
                console.log(chalk.cyan(`   ${data.punchline} 😄`));
            }, 1000);
        } catch (err) {
            console.log(chalk.red('Could not fetch a joke. Check your internet.'));
        }
    }
}

class GitHubCommand implements ICommand {
    async execute(username: string) {
        if (!Validator.isValidUsername(username)) {
            return console.log(chalk.red(`Validation Error: "${username}" is not a valid GitHub username format.`));
        }
        try {
            const { data } = await axios.get(`https://api.github.com/users/${encodeURIComponent(username)}`);
            console.log(chalk.green(`\nGitHub User: ${data.login}`));
            console.log(`   Name        : ${data.name ?? 'N/A'}`);
            console.log(`   Bio         : ${data.bio ?? 'N/A'}`);
            console.log(`   Public Repos: ${data.public_repos}`);
            console.log(`   Followers   : ${data.followers}`);
            console.log(chalk.cyan(`   Profile     : ${data.html_url}\n`));
        } catch (err) {
            console.log(chalk.red(`GitHub user "${username}" not found.`));
        }
    }
}

class QuoteCommand implements ICommand {
    async execute() {
        try {
            const { data } = await axios.get('https://dummyjson.com/quotes/random');
            console.log(chalk.cyan(`\n"${data.quote}"`));
            console.log(chalk.gray(`           — ${data.author}\n`));
        } catch (err) {
            console.log(chalk.red('Could not fetch a quote. Check your internet.'));
        }
    }
}

class WeatherCommand implements ICommand {
    async execute(city: string) {
        try {
            const { data } = await axios.get(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
            const current = data.current_condition[0];
            console.log(chalk.green(`\nWeather in ${city}:`));
            console.log(chalk.cyan(`   Temperature : ${current.temp_C}°C / ${current.temp_F}°F`));
            console.log(chalk.yellow(`   Condition   : ${current.weatherDesc[0].value}`));
            console.log(chalk.magenta(`   Humidity    : ${current.humidity}%\n`));
        } catch (err) {
            console.log(chalk.red(`Could not fetch weather for "${city}".`));
        }
    }
}

class SysinfoCommand implements ICommand {
    execute() {
        console.log(chalk.blue('\nSystem Information:'));
        console.log(chalk.cyan(`   OS Platform : ${os.platform()}`));
        console.log(chalk.cyan(`   CPU Arch    : ${os.arch()}`));
        console.log(chalk.cyan(`   Node Version: ${process.version}`));
        const tb = os.totalmem() / 1024 / 1024 / 1024;
        const fb = os.freemem() / 1024 / 1024 / 1024;
        console.log(chalk.magenta(`   Memory      : ${fb.toFixed(2)} GB free / ${tb.toFixed(2)} GB total\n`));
    }
}

class CoinFlipCommand implements ICommand {
    execute() {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
        console.log(chalk.yellow(`The coin landed on: ${chalk.bold(result)}`));
    }
}

class RollDiceCommand implements ICommand {
    execute() {
        const roll = Math.floor(Math.random() * 6) + 1;
        console.log(chalk.yellow(`You rolled a ${chalk.bold(roll)}`));
    }
}

class Base64Command implements ICommand {
    execute(action: string, text: string) {
        if (action === 'encode') {
            const encoded = Buffer.from(text).toString('base64');
            console.log(chalk.green(`Encoded: ${encoded}`));
        } else if (action === 'decode') {
            const decoded = Buffer.from(text, 'base64').toString('utf8');
            console.log(chalk.green(`Decoded: ${decoded}`));
        } else {
            console.log(chalk.red('Error: Action must be "encode" or "decode"'));
        }
    }
}

const program = new Command();
program.name('mycli').version('1.0.0', '-v, --version', 'Output the current version');

program
    .command('greet <name>')
    .description('Greet a user by name (Supports flags)')
    .option('-u, --uppercase', 'Force the greeting to be uppercase')
    .action((name: string, options: any) => new GreetCommand().execute(name, options));

program
    .command('add <num1> <num2>')
    .description('Add two numbers')
    .action((num1: string, num2: string) => new AddCommand().execute(num1, num2));

program
    .command('subtract <num1> <num2>')
    .description('Subtract the second number from the first')
    .action((num1: string, num2: string) => new SubtractCommand().execute(num1, num2));

program
    .command('multiply <num1> <num2>')
    .description('Multiply two numbers')
    .action((num1: string, num2: string) => new MultiplyCommand().execute(num1, num2));

program
    .command('divide <num1> <num2>')
    .description('Divide the first number by the second')
    .action((num1: string, num2: string) => new DivideCommand().execute(num1, num2));

program
    .command('hasao')
    .description('Fetch a random joke from the internet')
    .action(() => new JokeCommand().execute());

program
    .command('github <username>')
    .description('Fetch GitHub user info')
    .action((username: string) => new GitHubCommand().execute(username));

program
    .command('quote')
    .description('Fetch a random inspirational quote')
    .action(() => new QuoteCommand().execute());

program
    .command('weather <city>')
    .description('Fetch current weather conditions')
    .action((city: string) => new WeatherCommand().execute(city));

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
    .action((action: string, text: string) => new Base64Command().execute(action, text));

program.parse();
