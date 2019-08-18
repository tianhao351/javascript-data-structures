/**
 * @file  二叉树测试
 **/

const ROOT = '../';
const {BinNode, BinTree} = require(`${ROOT}/binTree/binTree`);

let rootNode = new BinNode(1);
let node2 = new BinNode(2);
let node3 = new BinNode(3);
let node4 = new BinNode(4);
let node5 = new BinNode(5);
let node6 = new BinNode(6);
let node7 = new BinNode(7);
let node8 = new BinNode(8);
let node9 = new BinNode(9);

let testTree = new BinTree(rootNode);
// testTree.travPreRecursion(rootNode);
// console.log('=====================');
testTree.insertAsLC(rootNode, node2);
// testTree.travPreRecursion(rootNode);
// console.log('=====================');
testTree.insertAsRC(rootNode, node6);
// testTree.travPreRecursion(rootNode);
// console.log('=====================');
testTree.insertAsLC(node2, node3);
// testTree.travPreRecursion(rootNode);
// console.log('=====================');
testTree.insertAsRC(node2, node4);
// testTree.travPreRecursion(rootNode);
// console.log('=====================');
testTree.insertAsLC(node4, node5);
// testTree.travPreRecursion(rootNode);
// console.log('=====================');
testTree.insertAsRC(node6, node7);
// testTree.travPreRecursion(rootNode);
// console.log('=====================');
testTree.insertAsLC(node6, node9);
// testTree.travPreRecursion(rootNode);
// console.log('=====================');
testTree.insertAsLC(node7, node8);
// testTree.travPreRecursion();
// console.log('+++++++++++++++++++++');
// testTree.travPreIteration();
// console.log('---------------------');
// testTree.travPreIteration2();

// testTree.travInRecursion();
// console.log('---------------------');
testTree.travInIteration();

let text = node7;
console.log(text.data, text.succ());
// testTree.travLevel();