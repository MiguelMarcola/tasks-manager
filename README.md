# Projeto Task Manager

Este é um projeto de gerenciamento de tarefas simples.

## Requisitos

Certifique-se de ter o Node.js instalado em sua máquina. Você pode baixá-lo em https://nodejs.org/.

## Instalação

1. Clone este repositório em sua máquina local:

```
 git clone https://github.com/MiguelMarcola/tasks-manager.git
```

2. Navegue até o diretório do projeto:

```
 cd tasks-manager
```
3. Instale as dependências do projeto:

```
 npm install
```

## Configuração

Certifique-se de configurar corretamente o arquivo `.env` na raiz do projeto. Você pode usar o arquivo `.env.example` como referência.

Observação, é necessário configurar corretamente seu projeto no firebase para conseguir o acesso de maneira adequada. para mais informações acesse [FireBase](https://firebase.google.com/docs/firestore/quickstart?hl=pt&authuser=0).
## Execução

Para executar o servidor, use o seguinte comando:

```
 npm start
```

O servidor será iniciado e estará acessível em `http://localhost:PORT`, onde `PORT` é a porta definida no arquivo `.env`.

## Exemplo de Requisição cURL

Para inserir tarefas, você pode usar o seguinte comando cURL:

```bash
curl -X POST -H "Content-Type: application/json" -d '[{"description":"Criar Login","responsable":"bruno","status":"done"},{"description":"Criar Menu","responsable":"bruno","status":"doing"},{"description":"Criar tela de perfil","responsable":"bruno","status":"todo"}]' http://localhost:PORT/insert-tasks
```
onde `PORT` é a porta definida no arquivo `.env`.


## Comandos da CLI

O projeto inclui uma interface de linha de comando (CLI) para inserir e exibir tarefas. Você pode usar os seguintes comandos:

- Para inserir tarefas:

```
 tmanager -insert src/examples/input.json
```
Você pode alterar os dados inseridos modificando o arquivo `src/examples/input.json` ou criando um novo arquivo com os dados desejados e alterando o caminho dele.

- Para exibir tarefas:

```
 tmanager -show
```

## Testes

Para executar os testes, você pode usar o seguinte comando:

```
 npm test
```

ou

```
 npm test:cov
```

Isso executará os testes e exibirá um relatório de cobertura.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests ou abrir problemas relatando bugs ou sugerindo novos recursos.

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para obter mais detalhes.
