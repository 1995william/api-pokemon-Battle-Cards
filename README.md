# API Pokemon Battle Cards

  ![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
  ![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
  ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
  ![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
  ![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)
  ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white)
  ![Visual Studio Code](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)

---

## Resumo

Este projeto foi realizado como parte da conclusão do desafio SomoS (back-end). Nele foi realizada a construção de uma API REST em Node.js utilizando MongoDB Atlas, com a temática de simular batalha de cartas pokemon que contém 807 cartas cadastradas e paginação de itens a ser exibidos.


## Endpoints


### Pokemons

* GET

Para listar todos os pokemons acesse a rota  {url}/pokemons

Response:

```
[
    {
        "_id": 1,
        "name": "Bulbasaur",
        "attributes": {
            "hp": 46,
            "attack": 49,
            "defense": 49,
            "special-attack": 65,
            "special-defense": 65,
            "speed": 45
        }
    },
    {
        "_id": 2,
        "name": "Ivysaur",
        "attributes": {
            "hp": 60,
            "attack": 62,
            "defense": 63,
            "special-attack": 80,
            "special-defense": 80,
            "speed": 60
        }
    },
    {
        "_id": 3,
        "name": "Venusaur",
        "attributes": {
            "hp": 80,
            "attack": 82,
            "defense": 83,
            "special-attack": 100,
            "special-defense": 100,
            "speed": 80
        }
    },
    {
        "_id": 4,
        "name": "Charmander",
        "attributes": {
            "hp": 39,
            "attack": 52,
            "defense": 43,
            "special-attack": 60,
            "special-defense": 50,
            "speed": 65
        }
    },
    {
        "_id": 5,
        "name": "Charmeleon",
        "attributes": {
            "hp": 58,
            "attack": 64,
            "defense": 58,
            "special-attack": 80,
            "special-defense": 65,
            "speed": 80
        }
    }
]
```
* POST

Para registrar pokemon acesse a rota {url}/pokemon

Request Body - Json

```
{
  "_id": number,
  "name": string,
  "attributes": {
    "hp": number,
    "attack": number,
    "defense": number,
    "special-attack": number,
    "special-defense": number,
    "speed": number
  }
}
```
### Batalha

* POST

O sistema de batalha funciona comparando 1 carta pokemon de cada oponente selecionado por id, o pokemon que possui atributos maiores vence a partida.

Para realizar batalha de cartas acesse a rota {url}/battle

Exemplos de pokemons selecionados para a batalha:

id 1 representado pelo  `Bulbasaur` e  id 4 representado pelo  `Charmander`.

Request Body - Json
```
{
    "playerOneCard":1,
    "playerTwoCard": 4
}
```

Response:

```
{
    "playerWinner": 1,
    "playerLoser": 2,
    "pokemon": "Bulbasaur",
    "details": {
        "hp": 1,
        "attack": 2,
        "defense": 1,
        "special-attack": 1,
        "special-defense": 1,
        "speed": 2
    }
}
```
Pokemon `Bulbasaur` possui atributos maiores que `Charmander`. Portando `Bulbasaur` é o vencedor.


Em caso de empate não registra a vitória no banco de dados e retorna.

Response:

```
Drawn battle
```

### Pontuações

* GET

Para acessar pontuações acumuladas acesse a rota {url}/scores 

Response:

```
{
    "playerOneWins": 0,
    "playerTwoWins": 0
}
```
* PUT

Para resetar as pontuações acesse a rota {url}/scores/reset

Response:

```
"score reseted"
```

## Swagger

Para melhor entendimento de todas as rotas, estão disponíveis no `Swagger`. Para acessar clique [aqui](https://api-pokemon-battle-cards.herokuapp.com/docs).


## Acesso a Aplicação

A API possui hospedagem no [Heroku](https://api-pokemon-battle-cards.herokuapp.com).

## Extras

Validação e verificação de dados utilizando fastest-validator.

Possui paginação e limite de itens .

## Executar o projeto localmente
 
### Requisitos

[Git](https://git-scm.com/)

[Node](https://nodejs.org/en/)

[MongoDB Atlas](https://account.mongodb.com/account/login)

Editor de código de sua preferência

### Instalação 

Utilize o Git Clone no repositório em uma pasta de sua escolha

```
$ git clone https://github.com/1995william/api-pokemon-Battle-Cards.git
```
Navegue até a pasta do projeto utilizando comando cd

```
$ cd api-pokemon-Battle-Cards
```
Execute o comando a seguir no terminal para instalar as dependências

```
$ npm install
```

### Configurando variáveis de ambiente

Para prosseguir com essa etapa é necessário ter cadastro no [MongoDB Atlas](https://account.mongodb.com/account/login).

Após realizar a configuração com Mongo, crie na raiz da pasta do projeto crie um arquivo `.env` .

Dentro do arquivo `.env` coloque a sua conexão do MongoDB.

Ex:
```
MONGO_USER = "joe" 
MONGO_PASSWORD = "123" 
MONGO_CLUSTER = "cluster0.wt39a.mongodb.net" 
MONGO_COLLECTION = "pokemons" 
```

Em seguida utilize o comando para executar o projeto

```
$ npm run dev
```
## Docker (opcional)

É possível executar o projeto pelo container `docker`, siga estes passos:

Para criar um container

```
docker build -t api-pokemon-battle-cards .
```
Para executar o container 

```
docker run --name api-pokemon-battle-cards --env-file .env -p 8000:8000 api-pokemon-battle-cards
```

## Desenvolvedor

Este projeto foi desenvolvido por [Rodrigo William](https://www.linkedin.com/in/rodrigo-william1/).

## Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.