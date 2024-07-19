import { expect, test, spyOn } from "bun:test"
import logger from "../../utils/logger"

test("logger has correct methods", () => {
  expect(typeof logger.info).toBe("function")
  expect(typeof logger.warn).toBe("function")
  expect(typeof logger.error).toBe("function")
  expect(typeof logger.debug).toBe("function")
})

