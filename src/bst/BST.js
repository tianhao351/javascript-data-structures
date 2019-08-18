/**
 * @file  二叉搜索树实现
 **/


const ROOT = '../';
const {BinNode, BinTree} = require(`${ROOT}/binTree/binTree`);


class BST extends BinTree {
    constructor(rootNode) {
        super(rootNode);
        // 记忆热点,总是指向命中节点（命中节点可能是null，即假想的哨兵节点）的父亲
        this._hot = null;
    }

    // 以xNode为根的子树中，查找特定的关键码e
    search(e, xNode = this._root) {
        // 将hot置为null，以防上次查找结果的干扰
        this._hot = null;
        return this._searchIn(e, xNode);
    }

    // 以xNode为根的子树中，查找特定的关键码e
    // 时间复杂度为O(h)，h为树的高度
    _searchIn(e, xNode) {
        // 递归基
        if (!xNode || e === xNode.data) {
            return xNode;
        }
        // 记忆当前节点
        this._hot = xNode;
        // 尾递归，很容易改成迭代版本
        return this._searchIn(e, (e < xNode.data ? xNode.lChild : xNode.rChild));
    }

    insert(e) {
        // 查找e，记录this._hot的的位置 ,O(h)
        let xNode = this.search(e, this._root);
        let eNode = null;
        // 禁止雷同元素,所以在查找失败时，才进行插入操作
        if (!xNode) {
            // 创建eNode，其父亲为this._hot
            eNode = new BinNode(e, this._hot);
            // 将eNode作为this._hot的左/右孩子
            e < this._hot.data ? this._hot.lChild = eNode : this._hot.rChild = eNode;
            this._size++;
            // 更新数高度,O(h)
            this._updateHeightAbove(eNode);
        }
        return eNode;
    }

    remove(x) {
        // 查找e，记录this._hot的的位置 ,O(h)
        let xNode = this.search(x, this._root);
        // 如果不存在返回false
        if (!xNode) {
            return false;
        }
        this._removeAt(xNode);
        this._size--;
        // 更新数高度,O(h)
        this._updateHeightAbove(this._root);

        return true;
    }

    _removeAt(xNode) {
        // 记录xNode
        let oldNode = xNode;
        // 代替者
        let newNode = null;
        // 单分支情况，隐含无分支情况
        if (!xNode.rChild) {
            newNode = xNode.lChild;
        }
        else if (!xNode.lChild) {
            newNode = xNode.rChild;
        }

        // 双分支情况
        else {
            // 直接后继
            oldNode = oldNode.succ();
            // 交换值
            let tempData = xNode.data;
            xNode.data = oldNode.data;
            oldNode.data = tempData;
            // xnode直接后继现在是xNode的值，他只能有右孩子。
            // f接下来将oldNode删除，并让他的右孩子代替其位置
            newNode = oldNode.rChild;
        }
        // 记录_hot
        this._hot = oldNode.parent;
        if (newNode) {
            newNode.parent = this._hot;
            if (newNode.data < this._hot.data) {
                this._hot.lChild = newNode;
            }
            else {
                this._hot.rChild = newNode;
            }
        }
        // 处理无子节点情况
        if (!newNode) {
            oldNode.parent.isRChild(oldNode) ? oldNode.parent.rChild = null : oldNode.parent.lChild = null;
        }
        return newNode;
    }
}

module.exports = BST;
