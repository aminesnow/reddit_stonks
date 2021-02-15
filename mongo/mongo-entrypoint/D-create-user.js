function getEnvValue(envVar, defVal) {
    var ret = run("sh", "-c", `printenv --null ${envVar} >/tmp/${envVar}.txt`);
    if (ret != 0) return defVal;
    return cat(`/tmp/${envVar}.txt`)
}


let MONGO_USER = getEnvValue('MONGO_USER', 'fail');
let MONGO_PASS = getEnvValue('MONGO_PASS', 'fail');
let MONGO_DB = getEnvValue('MONGO_DB', 'fail');
let USERNAME = getEnvValue('USERNAME', 'fail');
let PWD_HASH = getEnvValue('PWD_HASH', 'fail');

db = db.getSiblingDB(MONGO_DB);
db.auth(MONGO_USER, MONGO_PASS);

let res = db.getCollection('users').replaceOne(
    { username: USERNAME },
    { username: USERNAME, pwd: PWD_HASH },
    {
        upsert: true
    }
);

printjson(res);