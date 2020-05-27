//页面载入时，如果存在cookie，且未过期；则直接读取cookie
window.onload = function(){
    if(document.cookie.length>0){   //用一个临时数组保存将cookie拆分的值
            var key_value = document.cookie.split(";");
            var username = decodeURIComponent(key_value[0].split("=")[0]);
            var password = decodeURIComponent(key_value[0].split("=")[1]);
            document.getElementById("username").value = username;
            document.getElementById("pwd").value = password;
        
            
    }
}
//当提交时，删除之前的cookie，同时设置新的cookie
var submit = document.getElementById('user_login');

function set_update_cookie(){
    let key_value = document.cookie.split(";");
    let name = decodeURIComponent(key_value[0].split("=")[1]);
    
    let username = document.getElementById('username').value;
    let pwd = document.getElementById('pwd').value;
    if(name.length>0&&pwd.length>0){
        if(document.getElementById('remember').checked){
            deleteCookie(name);
            let curDate = new Date();
            let expires = new Date((curDate/1000+86400*30)*1000)  //设置30天后过期
            setCookie(username,pwd,expires);  
        }
        alert('登录成功')
    }else{
        alert('登录失败');
        return false;
    }
    
}

// window.onload = function getUserName(){
//     var key_value = document.cookie.split(";");
//     var username = decodeURIComponent(key_value[0].split("=")[0]);
//     return username;

// }

// window.onload = function getPwd(){
//     var key_value = document.cookie.split(";");
//     var password = decodeURIComponent(key_value[0].split("=")[1]);
//     return password;
// }