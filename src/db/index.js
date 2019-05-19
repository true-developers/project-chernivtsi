import SQLite from 'react-native-sqlite-storage';

function errorCB(err){
    console.log('SQL Error: ' + err);
};

function openCB(err){
    console.log('Database OPENED');
};

class Db{

    constructor(){
        this.connect = SQLite.openDatabase({name : "testDB.sqlite", createFromLocation : "~www/testDB.sqlite"}, openCB, errorCB);
    }

    execute(query, values = []){
        return new Promise((resolve, reject) => {
            this.connect.transaction((tx) => {
                tx.executeSql(query, values, (tx, results) => {
                    resolve(results.rows.raw());
                }, err => {
                    reject(err);
                });
            });
        });
    }
}

export default new Db();
