function getEnvValue(envVar, defVal) {
    var ret = run("sh", "-c", `printenv --null ${envVar} >/tmp/${envVar}.txt`);
    if (ret != 0) return defVal;
    return cat(`/tmp/${envVar}.txt`)
}


let admin = getEnvValue('MONGO_INITDB_ROOT_USERNAME', 'fail');
let pass = getEnvValue('MONGO_INITDB_ROOT_PASSWORD', 'fail');
let MONGO_USER = getEnvValue('MONGO_USER', 'fail');
let MONGO_PASS = getEnvValue('MONGO_PASS', 'fail');
let MONGO_DB = getEnvValue('MONGO_DB', 'fail');


db = db.getSiblingDB('admin');
db.auth(admin, pass);

db = db.getSiblingDB(MONGO_DB);
let res = db.createUser(
    {
        user: MONGO_USER,
        pwd: MONGO_PASS,
        roles: [
            {
                role: "readWrite",
                db: MONGO_DB
            }
        ]
    }
);

printjson(res);