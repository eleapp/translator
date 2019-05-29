
function is(s){
    var count = {
        en: 0,
        zh: 0,
    }

    s = s.replace(/[\s\d]/g, '')

    for(var i in s){
        var v = s[i]
        if(false)
            return
        else if(/[a-zA-Z]/.test(v))
            count.en++
        else if(/^[\u4e00-\u9fa5]+$/.test(v))
            count.zh++
    }

    for(var k in count){
        if(count[k] > s.length/2) return k
    }
}

module.exports = {
    is: is
}