# Custom CLI Tool (mycli)

A beautifully structured, fully-featured Command Line Interface (CLI) application built using Node.js and TypeScript. This project follows strict Object-Oriented Programming (OOP) principles by consolidating command execution via an `ICommand` interface under a clean, single-file architecture (`cosmic.ts`).

## ✨ Features
- **13 Unique Commands**: Ranging from mathematical operations to fun utilities and data fetching.
- **API Integrations**: Connects seamlessly to the GitHub API, Weather API, and Joke/Quote services using `axios`.
- **Validation Layer**: Includes strict input validation to prevent API errors and mathematical exceptions (e.g., catching `NaN`, invalid usernames, and division by zero).
- **Beautiful Output**: Utilizes `chalk` for colored, highly readable terminal responses.
- **Standard CLI Goodies**: Includes flag options (`-u, --uppercase`), a native version tag (`-v, --version`), and auto-generated help menus (`--help`).

---

## 🛠️ Installation & Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Puxhkar/my_custom_cli.git
   cd my_custom_cli
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Build the TypeScript files**:
   ```bash
   npm run build
   ```
4. **Link the package globally** (allows you to run `mycli` from anywhere):
   ```bash
   npm link
   ```

---

## ⌨️ Command Reference

### Core Utilities
| Command | Usage | Description |
| :--- | :--- | :--- |
| `greet` | `mycli greet <name> [-u]` | Greets you by name. Use `-u` to force uppercase. |
| `sysinfo` | `mycli sysinfo` | Displays basic OS environment and Memory information. |
| `base64` | `mycli base64 <encode/decode> <text>`| Instantly encodes or decodes text strings to/from Base64. |

### Mathematics
| Command | Usage | Description |
| :--- | :--- | :--- |
| `add` | `mycli add <n1> <n2>` | Adds two numbers together. |
| `subtract`| `mycli subtract <n1> <n2>` | Subtracts the second number from the first. |
| `multiply`| `mycli multiply <n1> <n2>` | Multiplies two numbers. |
| `divide` | `mycli divide <n1> <n2>` | Divides the first number. (Validates against zero division). |

### Web Data & APIs
| Command | Usage | Description |
| :--- | :--- | :--- |
| `github` | `mycli github <username>` | Fetches live profile statistics for a specified GitHub user. |
| `weather` | `mycli weather <city>` | Fetches real-time temperature, condition, and humidity for a city. |
| `hasao` | `mycli hasao` | Fetches and tells a random two-part internet joke. |
| `quote` | `mycli quote` | Delivers a random inspirational quote from dummyjson. |

### Fun Extras
| Command | Usage | Description |
| :--- | :--- | :--- |
| `flip` | `mycli flip` | Flips a virtual coin (Heads or Tails). |
| `roll` | `mycli roll` | Rolls a standard 6-sided dice. |

---

## 🎯 Usage Examples

**Fetching Live Weather:**
```bash
$ mycli weather London

Weather in London:
   Temperature : 15°C / 59°F
   Condition   : Partly cloudy
   Humidity    : 65%
```

**Using Feature Flags:**
```bash
$ mycli greet Pushkar --uppercase
HELLO, PUSHKAR! WELCOME TO MYCLI!
```

**Handling Validation:**
```bash
$ mycli divide 10 0
Validation Error: Division by zero is not allowed.
```
