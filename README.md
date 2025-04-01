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

## Descrição Técnica
O frontend foi desenvolvido utilizando Next.js 20.0.0, um framework React que oferece diversas funcionalidades para a construção de aplicações modernas e rápidas, como renderização do lado do servidor (SSR) e otimização de desempenho de forma automática.

Justificativa da Escolha do Next.js
A escolha do Next.js foi feita pela sua facilidade de uso, otimização automática e integração direta com APIs, o que se alinha perfeitamente à arquitetura do projeto. O Next.js permite a criação de páginas estáticas, dinâmicas, e oferece funcionalidades como rotas automáticas, pré-renderização de páginas, e hot reloading durante o desenvolvimento.

A utilização de SSR (Server-Side Rendering) para algumas páginas ajudou a melhorar o desempenho de carregamento e a experiência do usuário, tornando o frontend mais rápido, principalmente em termos de SEO e tempo de carregamento.

Uso de Node.js e NVM
A aplicação frontend foi desenvolvida utilizando Node.js, na versão 20.0.0, com npm como gerenciador de pacotes. Para facilitar a instalação e gestão de versões do Node.js, recomendamos o uso do NVM (Node Version Manager), que permite alterar rapidamente entre diferentes versões do Node em seu computador.

Se a versão do Node.js não for a 20.0.0, a instalação do NVM e o uso do comando nvm install 20.0.0 ajudam a garantir que o ambiente de desenvolvimento esteja correto.

Estrutura de Pastas
A estrutura de pastas no frontend segue as convenções do Next.js, com a organização das páginas, componentes e assets de forma a manter a escalabilidade e a clareza no projeto:

pages: Contém as páginas que são renderizadas quando o usuário acessa as rotas.

components: Componentes reutilizáveis, como botões, formulários, cards de produtos e outros.

public: Arquivos estáticos, como imagens e fontes.

styles: Arquivos CSS para estilização global ou específica.

A estrutura de pastas é bem definida para que qualquer desenvolvedor que trabalhe no projeto consiga entender rapidamente como o código está organizado.

Integração com o Backend
A integração com o backend é realizada por meio de chamadas HTTP para as APIs que o backend fornece. A URL base para as APIs é configurada no arquivo .env, e o Next.js se comunica com essas APIs utilizando o fetch ou bibliotecas como o axios para fazer as requisições necessárias.

É importante destacar que o frontend depende diretamente do backend e do banco de dados para funcionar corretamente. O backend deve estar rodando e o banco de dados deve estar ativo para que as APIs sejam acessadas com sucesso.

Autenticação e Estado
O sistema de autenticação no frontend é realizado com tokens gerados via Laravel Sanctum. Após o login, o token gerado é armazenado no localStorage ou cookies, permitindo que o usuário faça requisições autenticadas às APIs do backend.

A autenticação é tratada por meio de formulários de login, onde o usuário informa suas credenciais (email e senha) e recebe um token. Esse token é então usado nas requisições subsequentes para APIs protegidas.

Padrões de Código
Para garantir legibilidade e manutenção do código, seguimos boas práticas como:

Uso de hooks (como useState e useEffect) para gerenciamento de estado e efeitos colaterais.

Componentes reutilizáveis e bem estruturados.

