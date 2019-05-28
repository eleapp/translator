// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var global = {}

const { remote } = require('electron')

const size = remote.getCurrentWindow().getSize()
const width = size[0], height = size[1]

const input = document.getElementById('input')

function showResult(list){
  App.list = list
  var _height = list.length*50+height
  remote.getCurrentWindow().setSize(width, _height)
}

function hideResult(){
  remote.getCurrentWindow().setSize(width, height)
}

var timer_input = null

input.addEventListener('input', (e) => {
  var text = input.value

  if(!text) hideResult()

  window.clearTimeout(timer_input)
  timer_input = window.setTimeout(function(){
    var gt = require('./google/token')
    var tk = gt.token(text,global.tkk)
    translate({
      source: 'zh-CN',
      target: 'en',
      query: text,
      token: tk,
    })
  }, 1000)
})

function translate(opt) {
  var qs = {
      client: 'webapp',
      sl:     opt.source,
      tl:     opt.target,
      hl:     'zh-CN',
      tk:     opt.token,
      q:      encodeURIComponent(opt.query),
      ie:     'UTF-8',
      oe:     'UTF-8',
  }
  var dt = ['at','bd','ex','ld','md','qca','rw','rm','ss','t']

  var arr = []
  for (var i in qs)
      arr.push(i + '=' + qs[i])
  for (var i in dt)
      arr.push('dt=' + dt[i])
  
  var url = 'https://translate.google.cn/translate_a/single?' + arr.join('&')

  var request = require('request')
  request(url, function (error, response, body) {
    var json = JSON.parse(body)
    console.log(json)
    var list = json2list(json)
    console.log(list)
    showResult(list)
  })
}

function json2list(json){
  var list = []
  if(json[0] && json[0][0] && json[0][0][0]){
    list.push(json[0][0][0])
  }
  if(json[1] && json[1][0] && json[1][0][2]){
    for(var k in json[1][0][2]){
      var v = json[1][0][2][k]
      list.push(v[0])
    }
  }
  return list
}

function init_tkk(){
  var home = 'https://translate.google.cn'
  var request = require('request')

  request(home, function (error, response, body) {
    var matched = body.match(/tkk:'(\d+\.\d+)'/)
    if(matched.length > 1) global.tkk = matched[1]
  })
}

init_tkk()
