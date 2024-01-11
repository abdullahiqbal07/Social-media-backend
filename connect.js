import mysql from 'mysql';

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'Abdullah',
    password: '1234567890',
    database: 'social',

})