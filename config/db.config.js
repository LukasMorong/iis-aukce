module.exports = {
    HOST: "iismysqlserver.mysql.database.azure.com",
    PORT: 3306,
    USER: process.env.DB_USER || "xmoron01@iismysqlserver",
    PASSWORD: process.env.DB_PASSWORD ||"P4r4dn3H3$l0",
    DB: "iisAukce",
    dialect: "mysql",
};