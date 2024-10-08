# Test-Technique-Libheros

- read the "Test Libheros.pdf" file for the prerequies  

/!\ This project is using Bun https://bun.sh/ make sure to install it before running the commands /!\

- Backend using Express.js
  + add a .env file in Backend directory with the following variables :
     + database info :
       * DB_USER
       * db_password
       * db_host
       * db_port
       * db_name
     + backend info :
       * port
       * JWT_SECRET
  
  + open a terminal => move to Backend directory => run `bun install` then `bun run index.js`

- Frontend using React.js 
  + open another terminal => move to Frontend/lib-app directory => run `bun install` then `bun run dev`

- populate.sql is the script to create the tables in PostgreSQL and add fake users/todolist/todos for tests purposes if needed
