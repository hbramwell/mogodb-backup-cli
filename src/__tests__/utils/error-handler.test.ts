import { expect, test, spyOn } from "bun:test"
import { AppError, handleError } from "../../utils/error-handler"
import logger from "../../utils/logger"

test("AppError creates error with correct properties", () => {
  const error = new AppError("Test error", 400)
  expect(error.message).toBe("Test error")
  expect(error.statusCode).toBe(400)
  expect(error.name).toBe("AppError")
})

test("handleError logs AppError correctly", () => {
  const loggerSpy = spyOn(logger, "error")
  const error = new AppError("Test error", 400)
  handleError(error)
  expect(loggerSpy).toHaveBeenCalledWith("400 - Test error")
  loggerSpy.mockRestore()
})
