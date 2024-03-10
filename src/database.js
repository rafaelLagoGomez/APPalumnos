
const mysql = require("mysql2/promise")

const pool = mysql.createPool(
    {
        host: 'localhost',
        user: 'root',
        password: "Miisima79++",
        database: 'myschool',
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 60000,
        queueLimit: 0
    }
);

console.log("conexión con la BBDD Creada");

module.exports = {pool};