import mysql2 from "mysql2/promise"; 

import environments from "../config/environments.js"; 

const { database } = environments; 

const connection = mysql2.createPool({ //createpool deja un conjunto de conexiones abiertas para tirarle sentencias sql
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password
});
///exportat conexion abierta
export default connection;