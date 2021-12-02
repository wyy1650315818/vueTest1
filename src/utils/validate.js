/**
 * 过滤特殊字符
 */
 export function stripscript(str) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < str.length; i++) {
        rs = rs + str.substr(i, 1).replace(pattern, '');
    }
    return rs;
}
/**
 * 验证密码
 */
export function validatePassword(value){
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    if(reg.test(value)){
        return false;
    }else{
        return true;
    }
}
/**
 * 验证验证码
 */
 export function validateCodes(value){
    let reg = /^[A-Za-z0-9]{6}$/;
    console.log('validateCodes:'+value)
    console.log(reg.test(value))
    return reg.test(value) ? false:true;
}