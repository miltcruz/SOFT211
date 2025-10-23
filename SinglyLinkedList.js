class ListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }
  
  // O(1)
  prepend(value) {
    this.head = new ListNode(value, this.head);
    this.length++;
  }
  
  // O(n)
  append(value) {
    const node = new ListNode(value);
    if (!this.head) { this.head = node; this.length++; return;}
    
    let current = this.head;
    while (current.next) current = current.next;
    current.next = node;
    this.length++;
  }
  
  // O(n)
  find(predicate) {
    let current = this.head;
    while (current) {
      if (predicate(current.value)) return current;
      current = current.next;
    }
    return null;
  }
  
  // O(1)
  removeHead() {
    if (!this.head) return null;
    const value = this.head.value;
    this.head = this.head.next;
    this.length--;
    return value;
  }
}

const list = new SinglyLinkedList();
list.prepend(10);
list.prepend(20);
list.prepend(30);

console.log('list', list);

const node = list.find(value => value > 15);
console.log('node',node);
