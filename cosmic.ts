#!/usr/bin/env node
import { Command } from 'commander';
import axios from 'axios';
import chalk from 'chalk';
import * as os from 'os';

interface ICommand {
    execute(...args: any[]): void | Promise<void>;
}

class GreetCommand implements ICommand {
    execute(name: string) {
        console.log(chalk.green(`Hello, ${name || 'user'}! Welcome to mycli!`));
    }
}

class AddCommand implements ICommand {
    execute(num1: string, num2: string) {
        const a = parseFloat(num1), b = parseFloat(num2);
        if (isNaN(a) || isNaN(b)) return console.log(chalk.red('Both arguments must be numbers.'));
        console.log(chalk.yellow(`The sum is ${a + b}`));
    }
}

class SubtractCommand implements ICommand {
    execute(num1: string, num2: string) {
        const a = parseFloat(num1), b = parseFloat(num2);
        if (isNaN(a) || isNaN(b)) return console.log(chalk.red('Both arguments must be numbers.'));
        console.log(chalk.yellow(`The difference is ${a - b}`));
    }
}

class MultiplyCommand implements ICommand {
    execute(num1: string, num2: string) {
        const a = parseFloat(num1), b = parseFloat(num2);
        if (isNaN(a) || isNaN(b)) return console.log(chalk.red('Both arguments must be numbers.'));
        console.log(chalk.yellow(`The product is ${a * b}`));
    }
}

class DivideCommand implements ICommand {
    execute(num1: string, num2: string) {
        const a = parseFloat(num1), b = parseFloat(num2);
        if (isNaN(a) || isNaN(b)) return console.log(chalk.red('Both arguments must be numbers.'));
        if (b === 0) return console.log(chalk.red('Division by zero is not allowed.'));
        console.log(chalk.yellow(`The quotient is ${a / b}`));
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

const program = new Command();
program.name('mycli').version('1.0.0', '-v, --version', 'Output the current version');

program
    .command('greet <name>')
    .description('Greet a user by name')
    .action((name: string) => new GreetCommand().execute(name));

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

program.parse();
