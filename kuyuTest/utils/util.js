const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function trim(s){
    return s.replace(/^\s+|\s+$/g,"")
}

function unique(arr){
    var res = [];　　
    var json = {};　　
    for (var i = 0; i < arr.length; i++) {　　　　
        if (!json[arr[i]]) {　　　　　　
            res.push(arr[i]);　　　　　　
            json[arr[i]] = 1;　　　　
        }　　
    }
    return res
}
module.exports = {
    formatTime: formatTime,
    trim: trim,
    unique: unique
}