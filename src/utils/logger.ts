import winston from "winston"
import chalk from "chalk"

// Define custom log levels
const customLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
}

// Define custom log colors
const customColors = {
  error: "red",
  warn: "yellow",
  info: "green",
  debug: "blue",
}

// Add custom log colors to winston
winston.addColors(customColors)

// Create a logger instance
const logger = winston.createLogger({
  levels: customLevels, // Set the custom log levels
  format: winston.format.combine(
    winston.format.timestamp(), // Add a timestamp to log messages
    winston.format.printf(({ timestamp, level, message }) => {
      const color = customColors[level as keyof typeof customColors] // Get the color for the log level
      // @ts-expect-error
      return `${chalk.gray(timestamp)} ${chalk[color](
        `[${level.toUpperCase()}]`,
      )}: ${message}` // Format the log message with timestamp, log level, and message
    }),
  ),
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({
      filename: "backup.log", // Log to a file named "backup.log"
      format: winston.format.simple(),
    }),
  ],
})

export default logger
