var Stack = require('./stack');

let stackA = new Stack();

stackA.push('a');

stackA.log();

stackA.push('b');

stackA.log();


console.log(stackA.peek());

stackA.pop();


stackA.log();

stackA.pop();


stackA.log();

stackA.push('c');

stackA.log();

console.log(stackA.peek());
console.log(stackA.size());







