import 'dotenv/config'
import { z, treeifyError } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(3333),
    DB_HOST: z.string(),
    DB_PORT: z.coerce.number().default(5432),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
    console.error('Invalid env variables', treeifyError(_env.error))

    throw new Error('Invalid env variables')
}

export const env = _env.data