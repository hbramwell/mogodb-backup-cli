import { expect, test, mock } from "bun:test"
import backup from "../../commands/backup"
import { AppError } from "../../utils/error-handler"

test("backup command calls backupDatabase with correct parameters", async () => {
  const mockBackupDatabase = mock(() => Promise.resolve())
  mock.module("../../services/backup", () => ({
    backupDatabase: mockBackupDatabase,
  }))

  const options = {
    uri: "mongodb://localhost:27017",
    database: "testDb",
    output: "./backup",
  }

  await backup(options)

  expect(mockBackupDatabase).toHaveBeenCalledWith(
    "mongodb://localhost:27017",
    "testDb",
    "./backup",
  )
})

test("backup command throws AppError when required options are missing", async () => {
  const options = {
    uri: "mongodb://localhost:27017",
    database: "testDb",
    // missing output
  }

  await expect(backup(options)).rejects.toThrow(AppError)
})
