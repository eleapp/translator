// form to json
function format(form){
    var json = {}
    var eles = form.querySelectorAll('[name]')
    for(var i = 0; i < eles.length; i++){
        var ele = eles[i]
        json[ele.name] = ele.value
    }
    return json
}

// json to form
function parse(json, form){
    for(var k in json){
        var v = json[k]
        form.querySelector('[name="'+k+'"]').value = v
    }
}

module.exports = {
    format: format,
    parse: parse,
}