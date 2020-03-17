function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let stack = [];
    let str = [];
    let strTemp = '';
    let result;
    let counter;
    let temp1, temp2;
    expr = expr.trim();
    let counterLeft = 0, counterRight = 0;
    for(let i = 0; i < expr.length; i++)
    {
        if(expr[i] == '(') counterLeft++;
        if(expr[i] == ')') counterRight++;
    }
    if(counterLeft != counterRight) throw new Error("ExpressionError: Brackets must be paired");
    for(let i=0; i<expr.length; i++){
        if(expr[i] == ' ') continue;
        if(((expr.codePointAt(i) >= 48) && (expr.codePointAt(i) <= 57)) && ((expr.codePointAt(i+1) >= 48) && (expr.codePointAt(i+1) <= 57)) && ((expr.codePointAt(i+2) >= 48) && (expr.codePointAt(i+2) <= 57))) {
            str.push(expr[i] + expr[i+1] + expr[i+2]);
            i = i+2;
            continue;
        }
        if(((expr.codePointAt(i) >= 48) && (expr.codePointAt(i) <= 57)) && ((expr.codePointAt(i+1) >= 48) && (expr.codePointAt(i+1) <= 57))) {
            str.push(expr[i] + expr[i+1]);
            i++;
            continue;
        }
        if((expr.codePointAt(i) >= 48) && (expr.codePointAt(i) <= 57)){
            str.push(expr[i]);
            continue;
        }
        if(expr[i] == '(') stack.push(expr[i]);
        if(expr[i] == ')'){
            for(let j = stack.length-1; stack[j]!= "("; j--)  str.push(stack.pop());
            
            stack.pop();
        }
        if(expr[i] == '+' || expr[i] == '-' || expr[i] == '*' || expr[i] == '/'){
            while(stack.length != 0 && (priority(stack[stack.length-1]) >= priority(expr[i]))){
                str.push(stack[stack.length-1]);
                stack.pop();      
            }
            stack.push(expr[i]);
        }
    }
    while(stack.length != 0){
        str.push(stack[stack.length-1]);
        stack.pop();
    }
    for(let i = 0; i < str.length; i++)
    {
        if(str[i] != '+' && str[i] != '-' && str[i] != '*' && str[i] != '/') stack.push(str[i]);
        else {
            temp2 = stack.pop();
            temp1 = stack.pop();
            switch(str[i]){
                case '+':  result = +temp1 + (+temp2);
                break;
                case '-':  result = +temp1 - (+temp2);
                break;
                case '*':  result = +temp1 * (+temp2);
                break;
                case '/':  {
                    if(+temp2 == 0) throw new "TypeError: Division by zero.";
                    result = +temp1 / (+temp2);
                }break;
            }
            stack.push(result);
        }
    }
    return +(result);
}

function priority(prior){
    switch(prior)
    {
        case '*': case '/': return 3;
        case '+': case '-': return 2;
        case '(': return 1;
    }
    return 0;
}

module.exports = {
    expressionCalculator
}