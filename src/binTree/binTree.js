/**
 * @file  二叉树th实现
 **/

class BinNode {
    constructor(data, parent = null, leftNode = null, rightNode = null) {
        this.data = data;
        this.lChild = leftNode;
        this.rChild = rightNode;
        this.parent = parent;
        this.height = 0;
        // 左式堆 留给以后
        this.npl = null;
        // 红黑树 留给以后
        this.color = null;
        this.size();
    }

    print() {
        console.log('node:', this);
    }

    visit() {
        console.log('node data:', this.data);
        return this.data;
    }
    // 获取子树规模
    size() {
        let s = 1;
        if (this.lChild) {
            s += this.lChild.size();
        }
        if (this.rChild) {
            s += this.rChild.size();
        }
        return s;
    }
    // 作为左孩子插入新的节点
    insertAsLC(newNode) {
        this.lChild = newNode;
        newNode.parent = this;
        // this.print();
    }

    // 作为右孩子插入新的节点
    insertAsRC(newNode) {
        this.rChild = newNode;
        newNode.parent = this;
        // this.print();
    }

    // 是否为其右孩子
    isRChild(childNode) {
        if (childNode === this.rChild) {
            return true;
        }
        return false;
    }

    // （中序遍历意义下）当前节点的直接后继
    succ() {
        // 临时记录
        let s = this;
        // 有右孩子的情况，直接后继在右子树中的最小节点
        if (s.rChild) {
            s = s.rChild;
            while (s.lChild) {
                s = s.lChild;
            }
        }
        // 若无右孩子，后继为将当前节点包含在其左子树中的最小祖先
        else {
            let sParent = s.parent;
            while (sParent.isRChild(s)) {
                s = s.parent;
                sParent = s.parent;
                // 中序遍历最后一项的错误处理，返回null
                if (sParent === null) {
                    return null;
                }
            }
            s = s.parent;
        }
        return s;
    }

    // 子树的层次遍历
    travLevel() {}

    // 子树的先序遍历
    travPreRecursion() {}

    // 子树的中序遍历
    travIn() {}

    // 子树的后序遍历
    travPost() {}
}


class BinTree {
    constructor(rootNode) {
        this._size = 0;
        this._root = rootNode;
    }

    // 更新x节点的高度
    _updateHeight(xNode) {
        // xNode的高度为xNode最远的后代
        // 无任何节点的树高度为0
        // 空树高度为-1
        xNode.height = 1 + Math.max(utilHeight(xNode.lChild), utilHeight(xNode.rChild));

    }

    // 更新x节点以及其祖先的高度
    // 复杂度on n=深度
    _updateHeightAbove(xNode) {
        while (xNode) {
            this._updateHeight(xNode);
            xNode = xNode.parent;
        }

    }
    // 左孩子插入
    insertAsLC(xNode, addNode) {
        if (!xNode.lChild) {
            xNode.insertAsLC(addNode);
            this._size++;
            this._updateHeightAbove(xNode);
        }
    }

    // 右孩子插入
    insertAsRC(xNode, addNode) {
        if (!xNode.rChild) {
            xNode.insertAsRC(addNode);
            this._size++;
            this._updateHeightAbove(xNode);
        }
    }

    // 规模
    size() {
        return this._size;
    }
    // 判空
    empty() {
        return !this._root;
    }
    // 树根
    BinNodePosi() {
        return this._root;
    }

    // 根左右
    // 先序遍历 递归实现 xNode为书中的一个节点，函数返回为xNode为根的先序遍历序列
    // 时间复杂度为O(n)，递归调用会执行包含通用的逻辑，每一帧的复杂度较高，有必要将其改写为迭代形式
    // 尾递归，很容易借助栈结构改写为迭代形式
    travPreRecursion(xNode = this._root) {
        // 递归基
        if (!xNode) {
            return;
        }
        xNode.visit();
        this.travPreRecursion(xNode.lChild);
        this.travPreRecursion(xNode.rChild);
    }

    // 先序遍历迭代版1
    travPreIteration(xNode = this._root) {
        // 栈
        let stack = [];
        stack.push(xNode);
        while (stack.length !== 0) {
            let visitNow = stack.pop();
            visitNow.visit();
            // 注意这里先右后左，由于栈先入后出
            if (visitNow.rChild) {
                stack.push(visitNow.rChild);
            }
            if (visitNow.lChild) {
                stack.push(visitNow.lChild);
            }
        }
    }

    // 先序遍历迭代版2
    travPreIteration2(xNode = this._root) {
        // 沿右分支遍历子树
        let visitAlongLeftBranch = function (xNode, s) {
            while (xNode) {
                xNode.visit();
                s.push(xNode.rChild);
                xNode = xNode.lChild;
            }
        };

        // 栈
        let stack = [];
        while (true) {
            visitAlongLeftBranch(xNode, stack);
            if (stack.length === 0) {
                break;
            }
            xNode = stack.pop();
        }
    }

    // 中序遍历递归
    travInRecursion(xNode = this._root) {
        if (!xNode) {
            return;
        }
        this.travInRecursion(xNode.lChild);
        xNode.visit();
        this.travInRecursion(xNode.rChild);
    }

    // 中序遍历迭代
    travInIteration(xNode = this._root) {
        // 沿右分支遍历子树
        let goAlongLeftBranch = function (xNode, s) {
            while (xNode) {
                s.push(xNode);
                xNode = xNode.lChild;
            }
        };

        // 栈
        let stack = [];
        while (true) {
            // 从当前节点出发，逐批入栈
            goAlongLeftBranch(xNode, stack);
            // 退出条件
            if (stack.length === 0) {
                break;
            }
            // 立即访问
            xNode = stack.pop();
            xNode.visit();
            xNode = xNode.rChild;
        }
    }

    // 层次遍历
    travLevel(xNode = this._root) {
        // 队列
        let queue = [];
        queue.push(xNode);
        while (queue.length !== 0) {
            let xNode = queue.shift();
            xNode.visit();
            if (xNode.lChild) {
                queue.push(xNode.lChild);
            }
            if (xNode.rChild) {
                queue.push(xNode.rChild);
            }
        }
    }

}




function utilHeight(node) {
    return node ? node.height : -1;
}


module.exports = {
    BinNode,
    BinTree
};
