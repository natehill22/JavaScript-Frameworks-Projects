cd C:\Users\nateh\OneDrive\Documents\GitHub\JavaScript-Frameworks-Projects\MongoDB\

md C:\Users\nateh\OneDrive\Documents\GitHub\JavaScript-Frameworks-Projects\MongoDB\db1
md C:\Users\nateh\OneDrive\Documents\GitHub\JavaScript-Frameworks-Projects\MongoDB\db2
md C:\Users\nateh\OneDrive\Documents\GitHub\JavaScript-Frameworks-Projects\MongoDB\db3

@REM Primary
start "a" mongod --dbpath ./db1 --port 30000 --replSet "demo"

@REM Secondary
start "b" mongod --dbpath ./db2 --port 40000 --replSet "demo"

@REM Arbiter
start "c" mongod --dbpath ./db3 --port 50000 --replSet "demo"

var demoConfig={ _id: "demo", members: [{ _id: 0, host: 'localhost:30000', priority: 10}, { _id: 1, host: 'localhost:40000' }, { _id: 2, host: 'localhost:50000', arbiterOnly: true }] };