import { compareEnv } from "./compare-env"

const [, , ...dotEnvPaths] = process.argv as string[]

compareEnv(...dotEnvPaths)
