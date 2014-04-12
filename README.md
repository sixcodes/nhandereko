# Nhadereko
---

## Sobre este documento

Este documento cobre os principais pre-requisitos e configurações da aplicação _"Nhadekero"_, deve ser o ponto de partida do desenvolvedor para conhecer e entender melhor toda a infraestrutura do projeto.

---

## Sobre a aplicação

Esta aplicação foi desenvolvida em Node.js, utilizando o MongoDB como banco de dados para persistencia\


---

## Bootstrap para desenvolvimento

Para iniciar a aplicação em desenvolvimento, os pré-requisitos são:

1 - [Node.js](http://nodejs.org)     
2 - [MongoDB](http://mongodb.org)     
3 - [Ruby 2.0.0](http://rvm.io) e gem [foreman](http://blog.daviddollar.org/2011/05/06/introducing-foreman.html) [opcionais]        

Após a instalação das dependencias acima, a instalação do Ruby e da gem `foreman` são opcionais, contudo irão facilitar o processo de inicialização dos processos da aplicação.

---

### Inicialização do servidor

Após a instalação de todas as dependencias listadas acima, o próximo passo é instalar os `packages` que a aplicação depende:

`cd /pasta/do/projeto && npm install`     

`npm install jake -g && npm install nodemon -g` (se ocorrer algum erro tente instalar com sudo: `sudo npm install jake -g && sudo npm install nodemon -g`)     

Em seguida existem dois metodos para rodar a aplicação em modo de desenvolvimento:

**1 - Com Ruby e foreman instalados:**

`foreman start -f Procfile.dev -p 5000` 

**2 - Sem o ruby e foreman:**

Cada processo deve ser inicializado separado:

`mongod`      
`nodemon server.js -p 5000`   

**OBS:** Em produção para iniciar o servidor do node.js, deve-se utilizar o comando `node server.js -p $PORT` ao contrário de `nodemon server.js`, pois o nodemon é **exclusivamente** para desenvolvimento. (veja Procfile.dev e Procfile)


**3 - Acessar aplicação:**

`open http://localhost:5000`

---

### Configurações

[TODO]

---

#### Bancos de dados

Em desenvolvimento, a configuração do MongoDB não precisa ser alterada inicialmente, mas para produção é necessário configurar os dados de acesso ao banco de dados.

**1 - Configuração do mongodb em produção:**

`config/dbConfig.js` - Se o servidor de banco de dados em produção estiver na mesma máquina, a configuração pode ser igual a do ambiente de desenvolviment, algo como:

```js
mongodb: {
    test: {
      url: "mongodb://localhost/euquerominhabiblioteca_test"
    },
    development: {
      url: "mongodb://localhost/euquerominhabiblioteca_development",
    },
    production: {
      url: "mongodb://localhost/euquerominhabiblioteca_production"
    }
  }
```

---

## Deploy:

Referências: 
http://savanne.be/articles/deploying-node-js-with-systemd/  
https://www.digitalocean.com/community/articles/how-to-install-and-run-a-node-js-app-on-centos-6-4-64bit        
http://commavee.com/2013/06/01/using-node-js-on-digital-ocean/  
http://stackoverflow.com/a/22018499/1057087     
http://www.technology-ebay.de/the-teams/mobile-de/blog/deploying-node-applications-with-capistrano-github-nginx-and-upstart.html         
https://gun.io/blog/tutorial-deploy-node-js-server-with-example/    

---

### Testing

[TODO]

---

### Authors

[TODO]

---

### TODO

[TODO]

---

### License

2013 - [TODO]
