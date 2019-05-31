const os = require('os')
const fs = require('fs')
const path = require('path')

// the default config
const Default = {
    results: 5,
    opacity: 1,
}

// config file path
var Path = path.join(os.homedir(), '.eleapp/translator/config.json')

function isExist(){
    return fs.existsSync(Path)
}

function write(json){
    if(!isExist()) mkdir(path.dirname(Path))
    fs.writeFileSync(Path, JSON.stringify(json))
}

function read(){
    return JSON.parse(fs.readFileSync(Path, {encoding: 'utf8'}))
}

function mkdir(dirpath){
    if(fs.existsSync(dirpath)){
        return true
    }else{
        if(mkdir(path.dirname(dirpath))){
            fs.mkdirSync(dirpath)
            return true
        }
    }
}

function get(){
    return isExist() ? read() : Default
}

function set(config){
    write(config)
}

module.exports = {
    Default: Default,
    get: get,
    set: set,
}