# Trabalho1 do 1°Bimestre (Programação avançada para WEB)

### Aluna: Cecilia de Jesus Barros
### Turma: CC5MB

## _Expansão do Aplicativo "Dositio"_


**Contexto:**

Em nossa disciplina estamos desenvolvendo as API’s de backend utilizando Node.js/Fastify
com bancos de dados não-relacionais (MongoDB). Nosso projeto prático, "Dositio",
atualmente apresenta um CRUD de produto e uma rota de autenticação (`/auth`). Até este
ponto, juntos, implementamos as rotas: GET `/products` e `/products/:id`, POST `/products`,
PUT `/products/:id` e DELETE `/products/ :id`.

**Recursos Implementados:**

- GET `/categories`: Deve retornar a lista de categorias de produtos existentes na
aplicação.
- POST `/categories`: Deve criar uma nova categoria no banco de dados. Garanta a
validação dos campos (apenas `name` e `img_url`). Deve retornar status 201 sem
conteúdo.
- PUT `/categories/:id`: Deve atualizar os dados de uma categoria específica.
- DELETE `/categories/:id`: Deve remover a categoria.
- GET `/categories/:id/products`: Deve retornar todos os produtos de uma categoria
específica
- POST `/register`: Deve criar um novo usuário. Garanta validação dos campos.

### Para iniciar:
- faça um **cd** para a pasta **dositio-main**
- No terminal faça **npm install** para instalar todas as dependências utilizadas no projeto


### Para colocar os dados no servidor 
No Projeto existe uma pasta chamada dados...nela coloquei os arquivos JSON criados por mim para o meu banco de dados, como utilizar:
- Crie uma conexão com o Mongodb "mongodb://127.0.0.1/dositio"
- Crie uma database com o nome "dositio" e uma coleção com o nome "categories"
- Importe o arquivo "dositio.categories.json" que esta neste projeto
- Crie agora uma coleção para products e importe o arquivo "dositio.products.json"

### Para fazer os testes
Com os arquivos já no servidor, agora é a hora de testar
- Utilize o comando **npm run test**
  
**NÃO** teste mais de 1 vez, pois como há testes de POST e DELETE os dados do servidor vão ser alterados, para testar novamente apague os dados no Mongo, carregue os arquivos novamente e inicie o teste.

### Utilizando o Thunderclient
A também uma maneira de adicionar os dados pelo thunderclient,mas antes é necessário "rodar" o servidor, no terminal faça **node server**.

Com o servidor pronto:
Por exemplo para criar um novo produto faça uma requisição POST em http://127.0.0.1:3000/products e em **body** adicione por exemplo:

````
{
   "name": "Tomate",
   "qtd": 20,
   "categorieId": "661b156d32e4efa9e54e5770" -> Id da categoria de frutas
}
````
PS: Este produto **já existe** no banco de dados

**Id das Categorias de Produtos**
- 661b11f732e4efa9e54e576e -> Verduras e Legumes;
- 661b12fd32e4efa9e54e576f -> Temperos;
- 661b156d32e4efa9e54e5770 -> Frutas;


## Como Conseguir um Token de Autenticação 
Todas as requisições HTTP (GET, PUT, POST e DELETE) podem ser feitas por meio do thunderclient tanto para categories quanto para products, mas a requisição GET é a única que não precisa de Autenticação. Para conseguir Autenticação siga os passos abaixo:
- Faça um requisição POST para  `http://127.0.0.1:3000/auth` no body é preciso ter:

```
  {
    "name": "Cecilia",  ->  Pode usar qualquer nome
    "password": "Abcd@1234" -> Para gerar o token essa senha é obrigatória
  }
```
- Isso retornará um token de acesso, copie e cole em headers.
- Em header coloque "x-access-token" e em value coloque o token gerado.
Pronto, agora com esse token todas as requisições podem ser feitas.
