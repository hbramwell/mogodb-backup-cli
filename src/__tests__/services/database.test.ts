import { expect, test, mock } from "bun:test"
import { MongoClient } from "mongodb"
import { connectToDatabase } from "../../services/database"
import { AppError } from "../../utils/error-handler"

test("connectToDatabase connects successfully", async () => {
  // Create a mock instance of MongoClient
  const mockMongoClientInstance = {} as MongoClient
  // Mock the connect method to return a Promise that resolves to the mock instance
  const mockConnect = mock(() => Promise.resolve(mockMongoClientInstance))
  MongoClient.prototype.connect = mockConnect

  await expect(
    connectToDatabase("mongodb://localhost:27017"),
  ).resolves.toBeInstanceOf(MongoClient)
  expect(mockConnect).toHaveBeenCalled()
})

test("connectToDatabase throws AppError on connection failure", async () => {
  const mockConnect = mock(() => Promise.reject(new Error("Connection failed")))
  MongoClient.prototype.connect = mockConnect

  await expect(connectToDatabase("mongodb://localhost:27017")).rejects.toThrow(
    AppError,
  )
  expect(mockConnect).toHaveBeenCalled()
})
