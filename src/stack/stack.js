// Stack
// fucntions: push pop peek size

class Stack {
    constructor() {
        this.storage = [];
        this.count = 0;
    }

    log() {
        console.log('内容是：', this.storage);
        console.log('长度是', this.count);
    }

    push(value) {
        this.storage[this.count] = value;
        this.count++;
        return this.count;
    }

    pop() {
        if (this.count < 0) {
            return undefined;
        }
        else {
            this.count--;
            delete this.storage[this.count];
            return this.storage[this.count];
        }
    }

    peek() {
        return this.storage[this.count - 1];
    }

    size() {
        return this.count;
    }
};

module.exports = Stack;