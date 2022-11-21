import * as utils from "@thesunny/script-utils"

import { compareEnv } from "../compare-env"

describe("index", () => {
  it("should pass", async () => {
    utils.logger.silence(() => {
      compareEnv("1.env", "1a.env")
    })
  })
  it("should warn", async () => {
    utils.logger.silence(() => {
      compareEnv("1.env", "extra.env")
    })
  })
  it("should fail", async () => {
    utils.logger.silence(() => {
      expect(() => compareEnv("1.env", "1a.env", "2.env", "3.env")).toThrow(
        /2[.]env.*missing key.*IN_1_ONLY/
      )
    })
  })
})
