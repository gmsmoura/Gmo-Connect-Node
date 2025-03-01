# Gmo-Connect-Node

Se atentar ao arquivo .env nos commits devido as chaves de api;

Comandos para executar o projeto:

1 - docker compose up - d

# comando para liberar permissão de adm para execução dos comandos powershell
2 - Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

3 - npm install -g pnpm

# confirmar versão pnpm
4 - pnpm -v

# adicionar pacote drizzle-kit
5 - pnpm add -D drizzle-kit

# aplicar migrate para subir as configurações de banco de dados
6 - pnpm drizzle-kit migrate

7 - pnpm run dev
