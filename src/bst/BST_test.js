/**
 * @file  BST 测试代码
 **/


const ROOT = '../';
const BST = require(`${ROOT}/bst/BST`);
const {BinNode, BinTree} = require(`${ROOT}/binTree/binTree`);

let node1 = new BinNode(1);
let node2 = new BinNode(2);
let node3 = new BinNode(3);
let node4 = new BinNode(4);
let rootNode = new BinNode(36);
let node6 = new BinNode(6);
let node7 = new BinNode(7);
let node8 = new BinNode(8);
let node9 = new BinNode(9);
let node10 = new BinNode(10);

let BstInstance = new BST(rootNode);


BstInstance.insert(27);
BstInstance.insert(58);
BstInstance.insert(6);
BstInstance.insert(53);
BstInstance.insert(64);
BstInstance.insert(40);
BstInstance.insert(46);
BstInstance.insert(38);
BstInstance.travInIteration();
console.log('++++++++++++++++')
// BstInstance.travPreIteration2();

console.log(BstInstance.remove(6));
console.log(BstInstance.remove(36));
console.log(BstInstance.remove(53));
console.log(BstInstance.remove(40));
console.log(BstInstance.remove(58));
console.log(BstInstance.remove(46));
console.log(BstInstance.remove(38));
console.log(BstInstance.remove(27));



console.log(BstInstance);

BstInstance.travInIteration();
