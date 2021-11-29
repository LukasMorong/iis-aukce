module.exports = {
    HOST: "iismysqlserver.mysql.database.azure.com",
    PORT: 3306,
    USER: process.env.DB_USER || "xxx",
    PASSWORD: process.env.DB_PASSWORD ||"xxx",
    DB: "iisAukce",
    dialect: "mysql",
};