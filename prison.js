let array = []
let numbers_tested=[]
let moves=50
let allow_move=true

let selected_num=Math.floor(Math.random()*100+1)
let win=0
let trial=0;

document.getElementById("selected").innerText=selected_num
for(let i=1;i<=100;i++){
    array.push(i)
}


let n_array=shuffle(array)
console.log(n_array)
arrange_objects()

let object_array= document.getElementById("container").children

for (let i=0;i<100;i++){
    object_array[i].onclick=function(){test_num(i);};
}

solve(selected_num)
function solve(num){
    num=num-1
    if(!numbers_tested.includes(num)){
        object_array[num].classList.add('reavealed');
        object_array[num].innerText=n_array[num];
        numbers_tested.push(num)
        moves=moves-1
        document.getElementById('moves').innerText=moves

        if(n_array[num]==selected_num){
            win=win+1 
            trial=trial+1
            object_array[num].classList.add("right")
            document.getElementById("win_count").innerText=win
            document.getElementById("total_count").innerText=trial
            setTimeout(cover,500)
            return
        }
        else if(moves==0){
            trial=trial+1
            document.getElementById("total_count").innerText=trial
            setTimeout(cover,500)
            return
        }
        setTimeout(function(){solve(n_array[num])},50)
    }
}


function cover(){
    for(let i=0;i<100;i++){
        object_array[i].classList.remove('reavealed')
        object_array[i].classList.remove('right')
        object_array[i].innerText=i+1
        moves=50
        selected_num=Math.floor(Math.random()*100+1)
        document.getElementById("selected").innerText=selected_num
        document.getElementById('moves').innerText=moves
        allow_move=true
        numbers_tested=[]
    }
    setTimeout(function(){solve(selected_num)},300)
}
function test_num(num){
    if(!numbers_tested.includes(num) && allow_move){
        object_array[num].classList.add('reavealed');
        object_array[num].innerText=n_array[num];
        numbers_tested.push(num)
        moves=moves-1
        document.getElementById('moves').innerText=moves

        if(n_array[num]==selected_num){
            win=win+1 
            trial=trial+1
            object_array[num].classList.add("right")
            document.getElementById("win_count").innerText=win
            document.getElementById("total_count").innerText=trial
            allow_move=false
            setTimeout(cover,2000)
        }
        else if(moves==0){
            trial=trial+1
            document.getElementById("total_count").innerText=trial
            allow_move=false
            setTimeout(cover,2000)
        }
    }
}

function shuffle(array){
    let n_array=[]
    for(let i=0;i<100;i++){
        n_array.push(array.splice(Math.floor(array.length * Math.random() )  ,1)[0])
    }
    return n_array
}
function arrange_objects(){
    for(let i=1;i<=100;i++){
        let cell=document.createElement("div")
        cell.classList.add('card')
        cell.style.gridArea= Math.ceil(i/10).toString() +'/'+(i%10).toString()+'/'+ Math.ceil(i/10).toString() +'/'+(i%10).toString()
        cell.innerText=i
        document.getElementById("container").appendChild(cell)
    }
}