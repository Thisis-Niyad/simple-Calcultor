function check() {
    let x = document.getElementById("textfeild").value;
    x = x.replaceAll('x', '*');
    x = x.replaceAll('÷', '/');
    x = x.replaceAll('pi', 22 / 7);
    const regex = /[a-zA-Z]/;
    if (regex.test(x)) {
        document.querySelector("#result").innerText = 'invalid expression';
    } else {
        function infixToPostfix(expression) {
            const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '!': 1, '√': 1, '%': 2 };
            const stack = [];
            const output = [];

            expression.match(/(\d+(\.\d+)?|\+|\-|\*|\%|\!|\/|\(|\√|\))/g).forEach(token => {

                if (!isNaN(token)) {
                    output.push(token); // Operand
                } else if (token === '(') {
                    stack.push(token);
                } else if (token === ')') {
                    while (stack.length && stack[stack.length - 1] !== '(') {
                        output.push(stack.pop());
                    }
                    stack.pop(); // Remove '('
                } else { // Operator
                    while (stack.length && precedence[stack[stack.length - 1]] >= precedence[token]) {
                        output.push(stack.pop());
                    }
                    stack.push(token);
                }
            });

            while (stack.length) {
                output.push(stack.pop());
            }

            return output.join(' ');
        }

        let postfix = infixToPostfix(x); // Output: "3 4 + 2 *"
        console.log(postfix);


        function evaluatePostfix(expression) {
            const stack = [];
            const tokens = expression.split(/\s+/); // Split by spaces

            for (const token of tokens) {
                console.log(expression);

                if (!isNaN(token)) {
                    // If the token is a number, push it to the stack
                    stack.push(Number(token));
                }
                else {
                    // Token is an operator
                    const b = stack.pop(); // Right operand
                    const a = stack.pop(); // Left operand
                    switch (token) {
                        case '+':
                            stack.push(a + b);
                            break;
                        case '-':
                            stack.push((a * 10 - b * 10) / 10);
                            break;
                        case '*':
                            stack.push(a * b);
                            break;
                        case '/':
                            stack.push(a / b);
                            break;
                        case '%':
                            stack.push(a % b);
                            break;
                        case '!':
                            if (a) {
                                stack.push(factorial(a));
                            } else {
                                stack.push(factorial(b));
                            } break;
                        case '√': if (a) {
                            stack.push(Math.sqrt(b) * a);
                        } else {
                            stack.push(Math.sqrt(b));
                        }
                            break;

                        default:
                            throw new Error(`Unsupported operator: ${token}`);
                    }
                }
            }
            return stack.pop();
        }

        let postfixExpression = postfix.replaceAll("(", "");
        console.log(postfixExpression);

        document.querySelector("#result").innerText = '=' + evaluatePostfix(postfixExpression); // Output: 64

    }
}
function factorial(n) {
    if (n < 0) return "Undefined for negative numbers"; // Handle negative inputs
    if (n === 0 || n === 1) return 1; // Base case
    return n * factorial(n - 1); // Recursive case
}


function display(val) {
    document.getElementById("textfeild").setAttribute("style", 'font-size: xxx-large;')
    document.getElementById("result").setAttribute("style", 'font-size: xx-large;')
    document.getElementById("textfeild").value += val;
    check();
}
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        eva();
    }
});
function eva() {


    let A = document.getElementById("textfeild");
    A.setAttribute("style", 'font-size: xx-large;');
    let B = document.getElementById("result");
    B.setAttribute("style", 'font-size: xxx-large;');
    let C = document.getElementById("history");
    C.innerText = A.value + B.innerText;
    check();

}
function clr() {
    var l = document.getElementById("textfeild").value.length;
    var f = document.getElementById("textfeild").value.substr(0, l - 1);
    console.log(f.length);
    if (f.length > 1) {
        document.getElementById("textfeild").value = f;
        check();

    } else {

        let a = document.getElementById("textfeild");
        let b = document.getElementById("result");
        a.value = " ";
        b.innerText = " ";
    }

}
function AC() {
    document.getElementById("textfeild").value = " ";
    document.getElementById("result").innerText = " ";
    document.getElementById('history').innerText = '';
}
function toggle() {
    let flip = document.querySelector('.flip');
    if (flip.classList.contains('flipforward')) {

        flip.classList.remove("flipforward");

    } else {
        flip.classList.add("flipforward");
    }

    let btn = document.querySelectorAll(".toggle");
    if (btn[0].classList.contains("dis")) {
        btn.forEach(element => {
            element.classList.remove("dis");
        });
    }
    else {
        btn.forEach(element => {
            element.classList.add("dis");
        });
    }
}