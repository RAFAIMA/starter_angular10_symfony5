

# Starter Angular 10 | Symfony5

A starter CRUD app based on **Angular 10 and symfony5**.


### Prerequisites

1. Install [Node.js](https://nodejs.org) `v12.18.2`
2. Install Angular CLI `v10.0.5` by running the following command:
  ```bash
  npm -g @angular/cli
  ```
3. You need to have at least php 7.3.5  :

### Installing

1. Clone the project from Github
  ```bash
  git clone https://github.com/RAFAIMA/starter_angular10_symfony5.git
  ```
2. start with cd front, and from project front folder install all the dependencies by running the following command inside your terminal:
  ```bash
  npm install
  ```
3. from project root folder go to back folder (cd Back) and run the following command inside your terminal:
  ```bash
  1. composer install
  2. I used LexikJWTAuthenticationBundle for JWT (Json Web Token) authentication
  - So you need to generate the SSL keys:
  - And do not forget to change 
      lexik_jwt_authentication.pass_phrase, in .....\back\config\packages\lexik_jwt_authentication.yaml
  - Documentation of LexikJWTAuthenticationBundle:
  https://github.com/lexik/LexikJWTAuthenticationBundle/blob/master/Resources/doc/index.md#getting-started
      
3. Change and configure your DATABASE_URL. in back/.env
4. create your Databse if it did not exist:
        php bin/console doctrine:database:create
5. Than migration:
        php bin/console make:migration
6. Finally the tables
 php bin/console doctrine:migrations:migrate
  ```
4. Do not forget please to change the path of the back in        "front/src/app/global.ts"
 ```bash
  url: 'http://localhost/Use_your_root_project_name/back/public'
  
  ```

5. Launch the app with localhost:4200
 ```bash
  ng serve --open
  
  ```

   

6. Register, than sign in, and start all CRUD operations



## Authors

* ** RAFAI Mohamed Amine ** 
