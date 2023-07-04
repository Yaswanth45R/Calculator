function add(a,b)
{
    return a+b;
}

function sub(a,b)
{
    return (a-b).toFixed(6);
}

function mult(a,b)
{
    return (a*b).toFixed(6);
}
function div(a,b)
{
    if(b==0){
        return "Can not divide by Zero";
    }
    return (a/b).toFixed(6);
}

let num1 = 0;
let num2 = 0;
let oper = "";

function operate(oper,num1,num2)
{
    if(oper=="+") return add(num1,num2);
    if(oper=="-") return sub(num1,num2);
    if(oper=="x") return mult(num1,num2);
    if(oper=="/") return div(num1,num2);
}

let buttons = document.querySelectorAll(".cal_buttons");
buttons.forEach((but)=>{
    if(!(but.textContent=="="))
    {
        but.addEventListener('click',addToDisplay);
    }
    but.addEventListener('transitionend',removeTransition);
}
);

let displayRowOne = document.querySelector(".display_row_one");

function addToDisplay(e){
    this.classList.add('click');
    displayRowOne.textContent +=e.target.innerText;
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') {return};
    this.classList.remove('click');
}

let clrButton = document.querySelector(".clr_button");
let displayRowTwo = document.querySelector(".display_row_two");

clrButton.addEventListener("click",clrScreen);
clrButton.addEventListener("transitionend",removeTransition);

function clrScreen()
{
    this.classList.add('click');
    displayRowOne.textContent = "";
    displayRowTwo.textContent = "";
}

let equals = document.querySelector(".equal");
equals.addEventListener('click',calculate);
equals.addEventListener("transitionend",removeEqualTransition);

function removeEqualTransition(e){
    if (e.propertyName !== 'transform') {return};
    this.classList.remove('clickEqual');
}

function calculate(e)
{
    this.classList.add('clickEqual');
    let displayText = displayRowOne.textContent+"+";
    let j = 0;
    let numbs = [];
    let operts = [];
    let result = 0;
    for (let i = 0; i < displayText.length; i++) {
        if(displayText[i]=="+"||displayText[i]=="-"||displayText[i]=="/"||displayText[i]=="x")  
        {
            numbs.push(displayText.slice(j,i));
            j = i+1;
            operts.push(displayText[i]);
        }      
    }
    operts.pop();

    let k = 0;
    for (let i = 0; i < numbs.length; i++) {
        if(numbs[0]== undefined || numbs[1]==undefined){ continue };
        result = operate(operts[k],Number(numbs[0]),Number(numbs[1]));
        numbs[0]= result;
        numbs[1]= numbs[i+2];
        k=k+1;
    }
    console.log(operate("+",1,2));
    displayRowTwo.textContent=result;
}