import { tool } from "ai";
import z from "zod";
import { pg } from "../../drizzle/client";

export const postgresTool = tool({
    description: `
    Realize uma query no Postgres para buscar informações sobre as tabelas do banco de dados.

    Só será permitido realizar operações de busca (SELECT), não será permitido realizar operações de escrita (INSERT, UPDATE, DELETE).

    Tables:

    """
    CREATE TABLE "subscriptions" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "name" text NOT NULL,
        "email" text NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        CONSTRAINT "subscriptions_email_unique" UNIQUE("email")
    );
    """

    Todas as operações devem retornar no máximo 50 itens.
    `.trim(),
    parameters: z.object({
        query: z.string().describe('A query do PostgreSQL para ser executada.'),
        params: z.array(z.string()).describe('parâmetros da query a ser executada.')
    }),
    execute: async ({ query, params }) => {
        console.log(query, params);

        const result = await pg.unsafe(query, params)

        return JSON.stringify(result)
    }
})