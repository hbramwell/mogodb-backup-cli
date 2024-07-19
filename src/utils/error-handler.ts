import logger from "./logger"

export class AppError extends Error {
  constructor(public message: string, public statusCode: number = 500) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * Handles errors and logs them using the logger.
 * @param error - The error to be handled.
 */
export function handleError(error: unknown): void {
  if (error instanceof AppError) {
    logger.error(`${error.statusCode} - ${error.message}`)
  } else if (error instanceof Error) {
    logger.error(`500 - ${error.message}`)
  } else {
    logger.error("An unknown error occurred")
  }
}
