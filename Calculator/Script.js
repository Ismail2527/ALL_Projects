let string = '';
let input = document.getElementById('display');
let buttons = document.querySelectorAll('.button');
let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        if(e.target.innerHTML == '='){
            // Here eval  is js function which evaluate  the  value more information go for net
            string = eval(string);
            input.value = string;
        }
        else if (e.target.innerHTML == 'AC'){
            string = '';
            input.value = string;
        }else if(e.target.innerHTML == 'DEL'){
            // Here substring  is function which gives substring of string more information go for net 
            string = string.substring(0,string.length-1);
            input.value = string;
            
        }
        else if (e.target.innerHTML == '00'){
            string += '00';
            input.value = string;
        }
        else
        {
            string += e.target.innerHTML;
            input.value = string;
        }
    })
})