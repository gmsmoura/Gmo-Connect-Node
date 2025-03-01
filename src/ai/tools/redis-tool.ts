import { tool } from "ai";
import z from "zod";
import { pg } from "../../drizzle/client";
import { Command } from "ioredis";
import { redis } from "../../redis/client";

export const postgresTool = tool({
    description: `
        Realiza um comando no Redis para buscar informações sobre o sistema de indicações, como número de cliques no link, número de indicações (convites) realizados e ranking de indicações.

        Só será permitido ser utilizada para buscar dados do Redis, não será permitido executar nenhum comando de escrita.

        Você pode buscar dados de:

        - Um hash chamado "referral:access-counbt" que contém o número de cliques no link de indicação/convite de cada usuário no formato { "SUBSCRIBER_ID": "CLICKS_COUNT" } onde o SUBSCRIBED_ID vem do Postgres.
        - Um zset chamado "referral:ranking" que contém o total de indicações (convites) de cada usuário onde o score é o número de indicações/convites e o conteúdo é o SUBSCRIBER_ID que vem do Postgres.
    `.trim(),
    parameters: z.object({
        command: z.string().describe('O comando a ser executado no Redis como GET, HGET, ZREVRANGE.'),
        args: z
            .array(z.string())
            .describe('Argumentos que vem logo após o comando do Redis'),
    }),
    execute: async ({ command, args }) => {
        console.log(command, args);

        const result = await redis.call(command, args)

        return JSON.stringify(result)
    }
})