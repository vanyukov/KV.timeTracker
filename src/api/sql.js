import tracks from "./db/tracks";
import currentTrack from "./db/currentTrack";
import settings from "./db/settings";
import comments from "./db/comments";
import relationJiraUTZ from "./db/relationJiraUTZ";

const nameDB = 'TimeTracks';
const tables = {
    tracks,
    currentTrack,
    settings,
    comments,
    relationJiraUTZ,
}

function openDB(){
    return openDatabase(nameDB, "0.1", "A list of time tracks", 200000);
}

function createTables(db) {
    db.transaction(function(tx) {

        for (let table in tables) {
            let query = `CREATE TABLE IF NOT EXISTS ${table} (`;
            const fields= [];
            for (let field in tables[table]){
                fields.push(` ${field} ${tables[table][field]} `)
            }
            query += fields.join();
            query += ')';
            tx.executeSql(query, []);
console.log(query)
        };
    });

}

function insert(db, table, data) {
    if (!table in tables){
        return null;
    }

    const dataKeys = Object.keys(data);
    let query = `INSERT INTO  ${table} (`;
    query += dataKeys.join();
    query += ') VALUES (';
    const args = [];
    for (let i = 0; i < dataKeys.length; i++){
        args.push(data[dataKeys[i]]);
        dataKeys[i] = '?';
    }
    query += dataKeys.join();
    query += ') ';

    db.transaction(function(tx) {
        tx.executeSql(query, args);
console.log(query)
    });
}

function selectDB(db, table) {
    if (!table in tables){
        return null;
    }

    return new Promise((resolve, reject)=>{
        db.transaction(function(tx) {
            let queru = `SELECT * FROM ${table}`;
            tx.executeSql(queru, [], ()=>{
                resolve(result.rows)
console.log(query)
            })

        });
    })
}


function dropTable(db, table) {
    if (!table in tables){
        return null;
    }

    db.transaction(function(tx) {
        let queru = `DROP TABLE ${table}`;
        tx.executeSql(queru, []);
console.log(query)
    });
}

export { openDB, selectDB, createTables };