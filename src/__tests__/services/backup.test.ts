import { expect, test, mock } from "bun:test"
import { MongoClient } from "mongodb"
import fs from "fs/promises"
import { backupDatabase } from "../../services/backup"

test("backupDatabase performs backup successfully", async () => {
  // Mock MongoClient and its methods
  const mockCollection = {
    find: mock(() => ({
      toArray: mock(() => Promise.resolve([{ _id: 1, name: "Test" }])),
    })),
  }
  const mockDb = {
    collection: mock(() => mockCollection),
    listCollections: mock(() => ({
      toArray: mock(() => Promise.resolve([{ name: "testCollection" }])),
    })),
  }
  const mockClient = {
    db: mock(() => mockDb),
    close: mock(() => Promise.resolve()),
  }
  mock.module("mongodb", () => ({
    MongoClient: {
      connect: mock(() => Promise.resolve(mockClient)),
    },
  }))

  // Mock fs methods
  mock.module("fs/promises", () => ({
    mkdir: mock(() => Promise.resolve()),
    writeFile: mock(() => Promise.resolve()),
  }))

  await expect(
    backupDatabase("mongodb://localhost:27017", "testDb", "./backup"),
  ).resolves.not.toThrow()

  expect(mockClient.db).toHaveBeenCalledWith("testDb")
  expect(mockDb.listCollections).toHaveBeenCalled()
  expect(mockCollection.find).toHaveBeenCalled()
  expect(fs.mkdir).toHaveBeenCalledWith("./backup", { recursive: true })
  expect(fs.writeFile).toHaveBeenCalled()
  expect(mockClient.close).toHaveBeenCalled()
})
