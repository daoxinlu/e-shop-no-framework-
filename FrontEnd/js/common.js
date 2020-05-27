var profile = document.getElementById('profile')
    var profileDiv = document.createElement('div');
    profileDiv.setAttribute('class','profile-div')
    var a1 = document.createElement('a')
    a1.href = '#1';
    a1.setAttribute('class','p-a')
    var a2 = document.createElement('a')
    a2.href = '#2';
    a2.setAttribute('class','p-a')
    var a3 = document.createElement('a')
    a3.href = '#3';
    a3.setAttribute('class','p-a')
    var a4 = document.createElement('a')
    a4.href = '#4';
    a4.setAttribute('class','p-a')
    var text1 = document.createTextNode('个人资料')
    var text2 = document.createTextNode('我的收货地址')
    var text3 = document.createTextNode('我的优惠券')
    var text4 = document.createTextNode('我的关注')
    a1.appendChild(text1)
    a4.appendChild(text4)
    a2.appendChild(text2)
    a3.appendChild(text3)
    
    profileDiv.appendChild(a1)
    profileDiv.appendChild(a2)
    profileDiv.appendChild(a3)
    profileDiv.appendChild(a4)
    profileDiv.setAttribute('style','display:none;')
    document.body.appendChild(profileDiv)
    window.onload = hiddenDiv;
    profile.onmouseover = showDiv;
    profile.onmouseleave = hiddenDiv;
    profileDiv.onmouseover = showDiv;
    profileDiv.onmouseleave = hiddenDiv;
    function hiddenDiv(){
        profileDiv.style.display = 'none';
    }
    function showDiv(){
        profileDiv.style.display = 'flex';
    }
