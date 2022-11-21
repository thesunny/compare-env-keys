import * as utils from "@thesunny/script-utils"
import arrDiff from "arr-diff"
import dotenv from "dotenv"

export function compareEnv(...dotenvPaths: string[]) {
  utils.title("Compare dotenv environments keys")
  for (const dotenvPath of dotenvPaths) {
    utils.ensureFileExists(dotenvPath)
  }
  const [mainEnvPath, ...otherEnvPaths] = dotenvPaths
  const mainEnvKeys = Object.keys(dotenv.parse(utils.readFile(mainEnvPath)))
  for (const otherEnvPath of otherEnvPaths) {
    utils.task(
      `Find missing keys: ${utils.stringify(mainEnvPath)} vs ${utils.stringify(
        otherEnvPath
      )}`
    )
    const otherEnvKeys = Object.keys(dotenv.parse(utils.readFile(otherEnvPath)))
    const diff = arrDiff(mainEnvKeys, otherEnvKeys)
    const reverseDiff = arrDiff(otherEnvKeys, mainEnvKeys)
    if (diff.length === 0) {
      if (reverseDiff.length === 0) {
        utils.pass(`Pass`)
      } else {
        utils.pass(
          `Pass. But FYI found in ${utils.stringify(
            otherEnvPath
          )} these extra keys ${reverseDiff
            .map((key) => utils.stringify(key))
            .join(", ")}`
        )
      }
    } else {
      utils.fail(
        `${utils.stringify(otherEnvPath)} missing keys ${diff
          .map((key) => utils.stringify(key))
          .join(", ")}`
      )
    }
  }
}
