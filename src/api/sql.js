import makeRequest from './helpers/makeRequest';

function openDB(){
    return openDatabase("TimeTracks", "0.1", "A list of time tracks", 200000);
}

export { openDB };