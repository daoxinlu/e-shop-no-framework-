    //搜索栏
    var search = document.getElementById('search-btn')
    var count = 0;
    search.onclick = function(){
        count++;
        console.log('click:'+count+'次')
    }
    //轮播,需要后端数据格式配合
    var lunbo = document.getElementById('lunbo')
    var item_list = document.getElementsByClassName('item-list')[0]
    var lunbo_id = 2;
    var timer = setInterval(function(){
        lunbo.src = `../src/img/${lunbo_id}.jpg`
        if(lunbo_id<6){
            lunbo_id++
        }else{
            lunbo_id = lunbo_id +1 -6;
        }
    },3000)
    item_list.addEventListener('mousemove',function(e){ //需要防抖,先放着
        // console.log(e.target.dataset.value)
        if(e.target.dataset.value){
            lunbo_id = parseInt(Array.from(e.target.dataset.value).find((item)=>Number(item)))
        }
        
        lunbo.src = `../src/img/${lunbo_id}.jpg`
    });
    
    
    setTimeout(function(){
        clearInterval(timer)
    },300000);
    //防抖函数
    function fangdou(){
        var time_id;
        if(time_id){
            clearTimeout(time_id)
        }
        time_id = setTimeout(()=>{
            flag = true;
        },3000)
    }
    var fixed_bar = document.getElementById('fixed-bar');
    
    document.documentElement.addEventListener('mousewheel',function(){
        if(document.documentElement.scrollTop>200){ 
            // console.log(fixed_bar)
            fixed_bar.setAttribute('style','z-index:100;visibility:visible')
        }else{
            fixed_bar.setAttribute('style','visibility:hidden')
        }
    })
    document.documentElement.addEventListener('mousemove',function(){
        
        if(document.documentElement.scrollTop>200){ 
            // console.log(fixed_bar)
            fixed_bar.setAttribute('style','visibility:visible')
        }else{
            fixed_bar.setAttribute('style','visibility:hidden')
        }
    })