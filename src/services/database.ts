import { MongoClient } from "mongodb"
import logger from "../utils/logger"
import { AppError } from "../utils/error-handler"

/**
 * Connects to the MongoDB database using the provided URI.
 * 
 * @param uri - The URI of the MongoDB database.
 * @returns A Promise that resolves to a MongoClient instance.
 * @throws {AppError} If there is an error connecting to the MongoDB database.
 */
export async function connectToDatabase(uri: string): Promise<MongoClient> {
  try {
    const client = new MongoClient(uri)
    await client.connect()
    logger.info("Connected to MongoDB")
    return client
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error)
    throw new AppError("Failed to connect to MongoDB", 500)
  }
}
