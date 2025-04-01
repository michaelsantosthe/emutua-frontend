# Guia de Uso do Sistema Frontend

## Tecnologias Utilizadas
- **Node.js 20.0.0**
- **Next.js**

## Configuração Inicial

### 1. Instalar o Node.js na Versão Correta
Para garantir compatibilidade, recomenda-se o uso do **Node.js 20.0.0**. Caso não tenha essa versão instalada, utilize o **nvm** (Node Version Manager) para gerenciar versões do Node.js.

#### Instalando o NVM (caso não tenha)

**Linux/macOS:**
```bash
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc  # ou source ~/.zshrc se estiver usando zsh
```

**Windows:**
Baixe o instalador do NVM para Windows: [NVM for Windows](https://github.com/coreybutler/nvm-windows/releases)

#### Instalando e Configurando o Node.js 20.0.0
```bash
nvm install 20.0.0
nvm use 20.0.0
```

### 2. Verificar e Configurar o Arquivo `.env`
Caso o arquivo `.env` não exista e apenas o `.env.example` esteja presente, renomeie-o para `.env` e confira se a URL da API está corretamente configurada:

```bash
cp .env.example .env
```

Dentro do arquivo `.env`, a variável deve estar assim:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 3. Instalando Dependências
Para instalar as dependências do projeto, execute:
```bash
npm install
```

### 4. Rodando o Projeto
Após a instalação, inicie o servidor de desenvolvimento com:
```bash
npm run dev
```
O frontend estará acessível em **http://localhost:3000**.

### ⚠️ Observação Importante
Para que o frontend funcione corretamente, o **backend** e o **banco de dados** devem estar rodando. Certifique-se de que o container MySQL e o servidor Laravel estão ligados antes de iniciar o frontend.

## Testando o Login
Após rodar o backend e frontend, você pode testar o login com as credenciais criadas pelo seeder do backend:

- **Email:** `michaelsantos.the@hotmail.com`
- **Senha:** `12345678`

Agora seu frontend está pronto para uso!

