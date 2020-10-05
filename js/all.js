document.querySelector('.banner').style.height = window.innerHeight + 'px';
window.onresize = function(){
    document.querySelector('.banner').style.height = window.innerHeight + 'px';
}
//DOM
let height = document.querySelector('.height');
let weight = document.querySelector('.weight');
let list = document.querySelector('.list');
let send = document.querySelector('.send');
let notice = document.querySelector('.notice');
let data = JSON.parse(localStorage.getItem('listData')) || [];
let trash = document.querySelector('.trash');
send.addEventListener('click',calculate,false);
list.addEventListener('click',deleteData,false);
trash.addEventListener('click',removeData,false);
update(data);

function calculate(e){
    e.preventDefault();
    if(height.value.trim()===''|| weight.value.trim()===''){
        $(".notice").show( notice.textContent = 'Please Enter Your Information'); 
        setTimeout(function() { 
            $(".notice").hide(); 
        }, 3000);
        return;
    }
    let content = {
        heightVal : height.value,
        weightVal : weight.value,
    }
    data.push(content);
    localStorage.setItem('listData',JSON.stringify(data));
    update(data);
    height.value = '';
    weight.value = '';
}

function update(item){
    let itemLen = item.length;
    let str = '';
    let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth()+1;
    let day = date.getDate();
    for(let i = 0; i < itemLen ; i++){
        let height = item[i].heightVal / 100;
        let weight = item[i].weightVal;
        let bmi = (weight / Math.pow(height,2)).toFixed(2);
        let result = "";
        switch(bmi){
            case bmi <=15 :
                result = "非常嚴重的體重不足";
                break;
            case bmi >15 && bmi <=16 :
                result = '嚴重體重不足';
                break;
            case bmi >16 && bmi <=18.5 :
                result = '體重過輕';
                break;
            case bmi >18.5 && bmi <=25:
                result = '體重正常';
                break;
            case bmi >25 && bmi <=30:
                result = '體重過重';
                break;
            case bmi >30 && bmi <=35:
                result = '中等肥胖';
                break;
            case bmi >35 && bmi <=40:
                result = '嚴重肥胖';
                break;
        }
        console.log(result);
        str+= `    
                <div class="d-flex justify-content-center align-items-center py-3">
                    <div class="text-white mr-3">${result}</div>
                    <div class="text-white mr-3">BMI: ${bmi}</div>
                    <div class="text-white mr-3">Height: ${item[i].heightVal} cm</div>
                    <div class="text-white mr-3">Weight: ${item[i].weightVal} kg</div>
                    <div class="text-white mr-3">${year+'/'+month+'/'+day}</div>
                    <i class="fas fa-trash text-white trash" data-index=${i}></i>
                </div>
        `
    }
    list.innerHTML = str;
}
function deleteData(e){
    let index = e.target.dataset.index;
    if(e.target.nodeName !== 'I'){
        return;
    }
    data.splice(index,1);
    localStorage.setItem('listData',JSON.stringify(data));
    update(data);
}
function removeData(){  
    data.splice(0,data.length);
    localStorage.setItem('listData',JSON.stringify(data));
    update(data);
}

 //     if(bmi <= 15){result = "非常嚴重的體重不足"}
        // else if(bmi > 15 && bmi <= 16){result = " 嚴重體重不足"}
        // else if(bmi > 16 && bmi <= 18.5){result = " 體重過輕"}
        // else if(bmi > 18.5 && bmi <= 25){result = " 體重正常"}
        // else if(bmi > 25 && bmi <= 30){result = " 體重過重"}
        // else if(bmi > 30 && bmi <= 35){result = " 中等肥胖"}
        // else if(bmi > 35 && bmi <= 40){result = " 嚴重肥胖"}
        //     else{result ="非常嚴重肥胖"}