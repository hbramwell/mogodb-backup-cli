# MongoDB Backup CLI Tool

A robust and user-friendly command-line interface (CLI) tool for backing up MongoDB databases. Built with Bun, TypeScript, and modern Node.js practices.

## Features

- Easy-to-use CLI interface
- Colorful and informative console output
- Robust error handling
- Logging to both console and file
- Graceful shutdown support
- Modular and extensible architecture

## Current Development Status

This project is under active development. The core functionality is implemented, but some features are still in progress and tests are being refined. Here's what's currently being worked on:

- **Enhanced Testing:**  Improving test coverage and fixing failing tests to ensure robustness.
- **Additional Backup Options:** Implementing incremental backups and configurable backup compression.
- **Configuration File Support:** Allowing users to load settings from a configuration file.

## Prerequisites

- [Bun](https://bun.sh/) (latest version)
- Node.js (v14 or later recommended)
- MongoDB (v4.0 or later)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/horacebramwell/mongodb-backup-cli.git
   cd mongodb-backup-cli
   ```

2. Install dependencies:
   ```
   bun install
   ```

## Usage

To backup a MongoDB database:

```
bun run src/index.ts backup -u <mongodb-uri> -d <database-name> -o <output-directory>
```

Options:

- `-u, --uri <uri>`: MongoDB connection URI (required)
- `-d, --database <database>`: Name of the database to backup (required)
- `-o, --output <output>`: Directory to store the backup files (required)

Example:

```
bun run src/index.ts backup -u mongodb://localhost:27017 -d mydb -o ./backups
```

## Project Structure

```
mongodb-backup-cli/
├── src/
│   ├── index.ts
│   ├── commands/
│   │   └── backup.ts
│   ├── services/
│   │   ├── database.ts
│   │   └── backup.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── config.ts
│   │   └── error-handler.ts
│   └── types/
│       └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Development

To build the project:

```
bun run build
```

To run tests (once implemented):

```
bun test
```

## Logging

Logs are written to both the console and a `backup.log` file in the project root. Console logs are color-coded for better readability.

## Error Handling

The application uses a custom `AppError` class and centralized error handling. Uncaught exceptions and unhandled rejections are logged and will cause the application to exit.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Bun](https://bun.sh/) - The JavaScript runtime and toolkit
- [Commander.js](https://github.com/tj/commander.js/) - Node.js command-line interfaces
- [MongoDB Node.js Driver](https://github.com/mongodb/node-mongodb-native) - MongoDB driver for Node.js

## Support

If you encounter any problems or have any questions, please open an issue in the GitHub repository.
