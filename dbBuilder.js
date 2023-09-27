import conn from "./config/db.js";

await conn.awaitQuery(
    "CREATE TABLE employees (id int NOT NULL AUTO_INCREMENT,name varchar(100) NOT NULL, username varchar(100), password varchar(100), PRIMARY KEY (id));"
);


await conn.awaitQuery(
    "CREATE TABLE buildings (id int NOT NULL AUTO_INCREMENT, name varchar(100) NOT NULL, PRIMARY KEY (id));"
);

await conn.awaitQuery(
    "CREATE TABLE floors (id int NOT NULL AUTO_INCREMENT, number int, buildingId int NOT NULL, PRIMARY KEY (id),FOREIGN KEY (buildingId) REFERENCES buildings(id) ON DELETE CASCADE);"
);

process.exit(0)