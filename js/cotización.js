let btnQuote = document.getElementById("btnQuote");
let btnPrint = document.getElementById("btnPrint");


btnQuote.addEventListener("click", function (e) {
    e.preventDefault();
    let hours = parseInt(document.getElementById("inputHours").value);
    // el parseInt (función predefinida) es solo para escribir enteros y que te regrese un NÚMERO entero
    let rate = parseFloat(document.getElementById("inputRate").value);
    //el parseFloat (función predefinida) es para usar decimales y que te regrese un NÚMERO con decimales
    let iva = document.getElementById("checkIVA").checked;
    let extras = document.getElementById("inputExtras");
    let changes = parseInt(document.getElementById("inputChanges").value);
    changes = (isNaN(changes)? 0 : changes); 
    let email = document.getElementById("inputEmail").value;
    let name = document.getElementById("inputName").value;

    let fixedCost = parseFloat(document.getElementById("inputFCost").value);
    fixedCost = (isNaN(fixedCost)? 0 : fixedCost);
    // el signo de interrogación significa "entonces" como en álgebra los tres puntos
    let cardText = document.getElementById("cardText");
    let cardCost = document.getElementById("cardCost");
    let flag = true; 

    if (isNaN(hours)){
        console.log("Horas no es un número");   
        console.log(document.getElementById("inputHours").style.borderColor);
        document.getElementById("inputHours").style.borderColor = "#FF0000"; //"rgb(256, 00, 00)"
        flag= false; 
    } else {
        document.getElementById("inputHours").value = hours;
        document.getElementById("inputHours").style.borderColor = "#00FF00";
    } //validación horas

    if (isNaN(rate)){
        console.log("Rate no es un número");
        console.log (document.getElementById("inputRate").style.borderColor);
        document.getElementById("inputRate").style.borderColor = "#FF0000";
        flag= false;
    } else {
        document.getElementById ("inputRate").style.borderColor = "#00FF00";
    }//validación tarifa

    
    if (flag) {
        cardText.innerHTML = `Email: ${email},<br/>Name: ${name} <br>
        We can quote a price of requirements:<br> ${getRequirements(extras)}<br>`;
   
        cardCost.innerHTML = "<strong>$"+quote(hours, rate, iva, extras, changes, fixedCost).toFixed(2);    
        
    }

});

btnQuote.addEventListener("click", function (e) {
    e.preventDefault()
       window.print(); 

});

const getRequirements = (ex)=> {
    let str =`<ul class="list-group col-4">`;
    for (let i = 0; i < ex.options.length; i++) { 
        console.log(ex.options[i].selected);
        if (ex.options[i].selected) {
           str += `<li class="list-group-item list-group-item-action"> ${ex.options[i].text} </li>`;

        }    
    }
    str += `</ul>`;
    return str;
}

function quote(h, r, vat, ex, p, fc){
    p /= 100; 
    let result = h * r * (1+p);
    let i=0;
     do {  
        console.log(ex.options[i].selected);
        if (ex.options[i].selected) {
            result += parseFloat(ex.options[i].value);
        } 
        i++;      
    } while (i< ex.options.length)
    result += fc; //Fixed costs
    if (vat){
        result *= 1.16;
    } //while
    return  result;
}
