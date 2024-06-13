"use strict";

//30-11-23: JavaScript Essentials I
    //Empieza
//FUNCIONES PARA VALIDAR LA EXPRESIÓN
function expAnalizer(exp){
    let i = 0;
    let band = false;
    let numbers = ["0","1","2","3","4","5","6","7","8","9"];
    let operands = ["+","-","*","/","%","^","**"];
    let extra = [".","(",")"];
    while(i < exp.length && !band){
        if(!numbers.includes(exp[i]) && !operands.includes(exp[i]) && !extra.includes(exp[i])){ //si no forma parte de ninguna hay error
            band = true;
        }
        ++i;
    }
    return band;
}
function expCheckerParenthesis(exp){ //NOTA: comprueba la cantidad de paréntesis sea la adecuada
    let cont1 = 0; //para contar los (
    let cont2 = 0; //para contar los )
    for(let i of exp){
        //contar cantidad de paréntesis
        if(i === "("){
            cont1++;
        }else if(i === ")"){
            cont2++;
        }
    }
    return (cont1 == cont2)?false :true;
}
function expReplace(exp){
    let expression = "";
    expression = exp;
    if(expression.includes("^")){  //detecta casos en donde se coloque ^ para realizar la operación de potencia, se reemplaza con **
        expression = exp.replace(/\^/g, "**");
    }else if(exp.match(/(\d+)\(/g) != null && exp.match(/(\))(\d)/g) != null){ //detecta casos en donde x(...)y para reemplazarlos con x*(...)*y
        expression = exp.replace(/(\d+)\(/g, '$1*(');
        expression = expression.replace(/(\))(\d)/g, '$1*$2');
    }else if(exp.match(/(\d+)\(/g) != null){ //detecta casos en donde x(...) para luego reemplazarlos con x*(...)
        expression = exp.replace(/(\d+)\(/g, '$1*(');
    }else if(exp.match(/(\))(\d)/g) != null){ //detecta casos en donde (...)x para luego reemplazarlos con (...)*x
        expression = exp.replace(/(\))(\d)/g, '$1*$2');
    }
    return expression;
}
//FUNCION PRINCIPAL
function calculate(){
    try{
        let expression = document.getElementById("operation").value; //obtiene la expresión
        if(expression === "" || expAnalizer(expression) || expCheckerParenthesis(expression)){ //comprueba la expresión
            throw error;
        }else{
            expression = expReplace(expression);
            document.getElementById("resultText").textContent = `Resultado: ${eval(expression)}`; //SALIDA
        }
    }catch(error){
        document.getElementById("resultText").textContent = "ERROR: expresión no válida";
    }
}
    //Termina