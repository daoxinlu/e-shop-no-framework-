/*这段脚本代码可优化地方太多，重复代码出现太多次了，应进行提取*/
var single_checkboxes = document.getElementsByClassName('cart-wrap-item-inp')
var all_goods = document.getElementById('all_goods');
var all_goods_price = document.getElementsByClassName('cart-summary-price')[0]
var good_count_input  = document.getElementsByClassName("good-count-input")
var cart_summary_count = document.getElementsByClassName('cart-summary-count')[0]
//统计购物车商品种类
var cart_count = document.getElementById('cart_count')

//统计已选商品数量
var cart_wrap_item = document.getElementsByClassName('cart-wrap-item')
var checked_arr = []
var count_arr = []
var per_good_price = []
var total_price = 0;
var all_goods_count = 0;



for(let i=0;i<cart_wrap_item.length;i++){
    var cur_item = cart_wrap_item[i]
    // console.log(cur_item.children[0])
    //将购物车所有的复选框状态、每件商品的件数以及每件商品的单价保存在对应的数组中，用于计算最后的总价
    checked_arr.push(cur_item.children[0].children[0].checked)
    count_arr.push(parseInt(cur_item.children[5].children[1].value))
    per_good_price.push(parseInt(cur_item.children[4].children[1].innerText))

    //监听复选框点击事件，决定是否将其算在总价上
    cur_item.children[0].addEventListener('click',(e)=>{
        if(e.target.checked!=undefined) {
            checked_arr[i] = e.target.checked;
        }
        //获取下标后重新计算总价
        calc_price()
    })    
}
//选择全部商品的按钮
all_goods.addEventListener('click',(e)=>{
    checked_arr = new Array(checked_arr.length).fill(e.target.checked)
    for(var i=0;i<single_checkboxes.length;i++){
        single_checkboxes[i].checked = e.target.checked
    }
    console.log(single_checkboxes.length)
    calc_price()
})

//计算单件价格以及初始化总价
window.onload = function(){
        
        for(var i=0;i<good_count_input.length;i++){
            var price = (good_count_input[i].value*good_count_input[i].parentNode.previousElementSibling.childNodes[2].innerText).toFixed(2)
            good_count_input[i].parentNode.nextElementSibling.childNodes[2].innerText = price
        }
        // console.log(checked_arr,count_arr,per_good_price)
        
        calc_price()
}

for(let i=0;i<good_count_input.length;i++){
    // var index = i;
    //监听button-
    good_count_input[i].previousElementSibling.onclick = function(e){
        
        var i=0;
        var order =e.target.parentNode.parentNode;
        // console.log(order)
        while(order.previousElementSibling!=null){order = order.previousElementSibling;i++;}
        // console.log(i)
        if(e.target.nextElementSibling.value!=0){
            e.target.nextElementSibling.value -=1
            
            count_arr[i] = parseInt(e.target.nextElementSibling.value)//这里i无定义，上下文是window
            // console.log(count_arr)
            price = e.target.parentNode.previousElementSibling.childNodes[2].innerText * e.target.nextElementSibling.value
            e.target.parentNode.nextElementSibling.childNodes[2].innerText = price.toFixed(2);
            
        }else {
            console.log('当前该商品数量为0')
        }
        //计算总价
        calc_price()
        
    };
    // good_count_input[i].index = i 不可行,为什么？
    //监听输入框输入
    good_count_input[i].addEventListener('input',(e)=>{
        // console.log(this.index) 
        var i=0;
        var order =e.target.parentNode.parentNode;
        // console.log(order)
        while(order.previousElementSibling!=null){order = order.previousElementSibling;i++;}
        // console.log(i)
        e.target.value = parseInt(e.target.value.replace(/[^\d]/g,''))
        count_arr[i] = parseInt(e.target.value);
        // console.log(count_arr)
        calc_price()

    })
    //监听输入框键盘事件
    good_count_input[i].addEventListener('keyup',(e)=>{
        
        var price = e.target.value * e.target.parentNode.previousElementSibling.childNodes[2].innerText
        e.target.parentNode.nextElementSibling.childNodes[2].innerText = price.toFixed(2);
    })
    //监听button+
    good_count_input[i].nextElementSibling.addEventListener('click',(e)=>{
        var i=0;
        var order =e.target.parentNode.parentNode;
        
        while(order.previousElementSibling!=null){order = order.previousElementSibling;i++;}
        
        e.target.previousElementSibling.value = parseInt(e.target.previousElementSibling.value)+1;  //为什么减法不需要转数字
        count_arr[i] = parseInt(e.target.previousElementSibling.value)
        // console.log(count_arr)
        var price = e.target.parentNode.previousElementSibling.childNodes[2].innerText * e.target.previousElementSibling.value
        e.target.parentNode.nextElementSibling.childNodes[2].innerText = price.toFixed(2);
        calc_price()
    })
}

//获取坐标&计算总价
function calc_price(){
    total_price = 0;
    all_goods_count = 0;
    for(var j=0;j<checked_arr.length;j++){    
        total_price += checked_arr[j]*count_arr[j]*per_good_price[j]
        all_goods_count += checked_arr[j]*count_arr[j];
    }
    console.log(total_price.toFixed(2))
    all_goods_price.innerText = total_price.toFixed(2)
    cart_summary_count.innerText = all_goods_count
    cart_count.innerText = String(good_count_input.length).replace(/[^\d]/g,'');
}

//处理删除商品
var delete_cur_good = document.getElementsByClassName("delete-cur-good")
for(var i=0;i<delete_cur_good.length;i++){
    delete_cur_good[i].index = i;
    delete_cur_good[i].onclick = (e)=>{
        // console.log(e,e.target.index) =
        // checked_arr[e.target.index]  = 
        // count_arr[e.target.index] = 
        console.log(e.target.index)
        if(confirm('确定删除此商品吗？')){
            e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
            // cart_wrap_item[e.target.index].outerHTML = ''
            console.log(e.target.index)
            count_arr.splice(e.target.index,1,0)
            checked_arr.splice(e.target.index,1,false)
            per_good_price.splice(e.target.index,1,0)
            console.log(count_arr,checked_arr,per_good_price)
            calc_price()
            
        }
    }
}