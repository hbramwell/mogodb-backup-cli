import { Command } from "commander"
import backup from "./commands/backup"
import logger from "./utils/logger"
import { gracefulShutdown } from "./utils/config"
import { handleError } from "./utils/error-handler"

const program = new Command()

program.version("1.0.0").description("MongoDB Database Backup CLI Tool")

program
  .command("backup")
  .description("Backup MongoDB database")
  .option("-u, --uri <uri>", "MongoDB connection URI")
  .option("-d, --database <database>", "Database name")
  .option("-o, --output <output>", "Output directory for backup")
  .action(async (options) => {
    try {
      await backup(options)
    } catch (error) {
      handleError(error)
      process.exit(1)
    }
  })

// Gracefully shutdown the process on SIGINT and SIGTERM signals
process.on("SIGINT", gracefulShutdown)
process.on("SIGTERM", gracefulShutdown)

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error)
  process.exit(1)
})

// Handle unhandled rejections
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason)
  process.exit(1)
})

try {
  await program.parseAsync(process.argv)
} catch (error) {
  handleError(error)
  process.exit(1)
}
