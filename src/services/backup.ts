import { MongoClient } from "mongodb"
import fs from "fs/promises"
import path from "path"
import { connectToDatabase } from "./database"
import logger from "../utils/logger"
import { AppError } from "../utils/error-handler"

/**
 * Performs a backup of a database.
 * 
 * @param uri - The URI of the database.
 * @param dbName - The name of the database.
 * @param outputDir - The directory where the backup files will be saved.
 * @returns A Promise that resolves when the backup is complete.
 */
export async function backupDatabase(
  uri: string,
  dbName: string,
  outputDir: string,
): Promise<void> {
  let client: MongoClient | null = null

  try {
    client = await connectToDatabase(uri)
    const db = client.db(dbName)
    const collections = await db.listCollections().toArray()

    await fs.mkdir(outputDir, { recursive: true })

    for (const collection of collections) {
      const collectionName = collection.name
      const data = await db.collection(collectionName).find({}).toArray()
      const outputPath = path.join(outputDir, `${collectionName}.json`)
      await fs.writeFile(outputPath, JSON.stringify(data, null, 2))
      logger.info(`Backed up collection: ${collectionName}`)
    }
  } catch (error) {
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError("Error during backup process", 500)
  } finally {
    if (client) {
      await client.close()
      logger.info("Closed database connection")
    }
  }
}
