const os = require('os')
const fs = require('fs')
const path = require('path')

// the default config
const Default = {
    home: 'https://translate.google.com',
    results: 5,
    opacity: 100,
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
    var config = isExist() ? read() : Default
    return valid(config) ? config : Default
}

function set(config){
    if(!valid(config)) return
    write(config)
}

function valid(config){
    if(isNaN(config.results) || config.results < 1 || config.results > 10)
        return false
    if(isNaN(config.opacity) || config.opacity < 1 || config.opacity > 100)
        return false
    return true
}

module.exports = {
    Default: Default,
    get: get,
    set: set,
}