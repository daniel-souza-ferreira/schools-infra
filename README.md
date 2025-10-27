
## 📘 Descrição
Aplicação **backend** desenvolvida em **Node.js** com **Express**, que realiza o **upload de arquivos CSV** contendo dados de instalações físicas por unidade escolar do município de São Paulo, armazenando essas informações em um **banco de dados relacional**.  
A aplicação também implementa um **CRUD completo** para gerenciamento das escolas e suas dependências, utilizando o ORM **Sequelize** e estrutura de camadas baseada em **repositórios**, **use cases**, **controllers** e **middlewares**.

> ⚠️ O frontend não foi implementado até o momento, este projeto contém apenas o backend funcional.

---

## 🧠 Tecnologias

- **Linguagem:** JavaScript (ES Modules)
- **Backend:** Node.js + Express
- **Banco de Dados:** PostgreSQL (via Sequelize ORM)
- **Validação:** Zod
- **Upload de arquivos:** Multer
- **Leitura de CSV:** csv-parser
- **Ambiente:** dotenv
- **Containerização:** Docker + Docker Compose (Bitnami PostgreSQL)
- **Desenvolvimento:** Nodemon

---

## 🚀 Como Executar

### 1. Clone o repositório
```bash
git clone https://github.com/daniel-souza-ferreira/schools-infra.git
```

### 2. Configure o ambiente
Crie um arquivo `.env` na raiz do projeto com as variáveis de ambiente necessárias de acordo com o arquivo .env.example, por exemplo:
```env
NODE_ENV=dev
PORT=3333
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=schools_infra
```

### 3. Suba o banco de dados com Docker Compose
```bash
docker compose up -d
```

### 4. Instale as dependências
```bash
npm install
```

### 5. Execute o servidor em modo desenvolvimento
```bash
npm run start:dev
```

O servidor estará rodando em:  
📍 `http://localhost:3333`

---

## 🧩 Funcionalidades

- **Upload de CSV:**  
  Importa um arquivo `.csv` contendo dados de instalações escolares e insere as informações no banco de dados.
  - **POST /schools/upload:** inserção no banco de dados a partir de um arquivo .csv  

- **CRUD completo de escolas e dependências:**  
  - **POST /schools:** cria uma nova escola com suas dependências  
  - **GET /schools:** busca paginada de escolas  
  - **GET /schools/:id:** busca detalhada de uma escola e suas dependências  
  - **PUT /schools/:id:** atualiza uma escola e todas as suas dependências associadas  
  - **DELETE /schools/:id:** exclui uma escola e suas dependências em cascata

- **Estrutura relacional:**  
  - Uma **School** possui várias **Dependencies** (`1:N`)  
  - Cada **Dependency** contém nome, quantidade e referência (school_id)

- **Validação de entrada com Zod**
- **Manipulação e leitura de CSV com csv-parser**
- **Organização por camadas (Repository Pattern + Use Cases)**

---

## 🧪 Estrutura de diretórios (simplificada)
```
src/
 ├── http/
 │   ├── controllers/
 │      ├── schools/
 │   ├── middlewares/
 │   └── use-cases/
 ├── repositories/
 │   ├── in-memory/
 │   └── sequelize/
 ├── lib/
 ├── models/
 ├── config/
 └── main.js
```

---

## 📦 Exemplo de CSV esperado

O arquivo CSV deve conter os dados de escolas e suas dependências, similar ao formato encontrado no link abaixo:
 - https://dados.educacao.sp.gov.br/dataset/instala%C3%A7%C3%B5es-f%C3%ADsicas-por-unidade-escolar
 - No Form Data enviado a rota de /upload, o arquivo deve ser inserido com name igual a file
Durante o upload, a aplicação fará o mapeamento desses campos e criará registros nas tabelas `schools` e `dependencies`.

---

## 🧱 Estrutura das Tabelas

### Tabela: **schools**
| Campo | Tipo | Descrição |
|-------|------|------------|
| id | UUID | Identificador único da escola |
| nomedep | STRING | Nome da dependência administrativa |
| de | STRING | Diretoria de ensino |
| mun | STRING | Município |
| distr | STRING | Distrito |
| codesc | STRING | Código da escola |
| nomesc | STRING | Nome da escola |
| tipoesc | INTEGER | Tipo da escola |
| tipoesc_desc | STRING | Descrição do tipo |
| codsit | STRING | Situação da escola |

### Tabela: **dependencies**
| Campo | Tipo | Descrição |
|-------|------|------------|
| id | UUID | Identificador único da dependência |
| name | STRING | Nome da dependência |
| quantity | INTEGER | Quantidade |
| school_id | UUID (FK) | Referência à escola (relação 1:N) |

---

## 💡 Observações finais
- O projeto foi estruturado pensando em **facilidade de testes futuros**, por isso foi criado um **repositório em memória** além do repositório Sequelize.  
- A arquitetura foi desenhada para permitir fácil integração futura com um **frontend em React**.  
- Pretende-se adicionar testes automatizados e interface gráfica em versões futuras.
