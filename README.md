# Custom CLI Tool (mycli)

A simple, interactive Command Line Interface (CLI) built with Node.js and TypeScript.

## 🛠️ Setup
1. Clone the repository and install dependencies: `npm install`
2. Build the project: `npm run build`
3. Link the package globally: `npm link`

## ⌨️ Available Commands

| Command | Usage | Description |
| :--- | :--- | :--- |
| `greet` | `mycli greet <name>` | Greets you by name. |
| `add` | `mycli add <n1> <n2>` | Adds two numbers. |
| `subtract`| `mycli subtract <n1> <n2>` | Subtracts the second number from the first. |
| `multiply`| `mycli multiply <n1> <n2>` | Multiplies two numbers. |
| `divide` | `mycli divide <n1> <n2>` | Divides the first number by the second. |
| `hasao` | `mycli hasao` | Fetches a random internet joke. |
| `github` | `mycli github <username>` | Fetches a GitHub user's profile info. |
| `quote` | `mycli quote` | Fetches a random inspirational quote. |
| `weather` | `mycli weather <city>` | Fetches real-time weather conditions for a city. |
| `sysinfo` | `mycli sysinfo` | Displays basic OS and Memory information. |

## 🎯 Example
```bash
$ mycli weather London
Weather in London:
   Temperature : 15°C / 59°F
   Condition   : Partly cloudy
   Humidity    : 65%
```
