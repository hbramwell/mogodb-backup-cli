import logger from "./logger"

export function gracefulShutdown() {
  logger.info("Received shutdown signal. Closing application gracefully...")
  // Perform any necessary cleanup here
  process.exit(0)
}
