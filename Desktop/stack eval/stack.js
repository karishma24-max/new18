class Stack{
    constructor(){
        this.stack=[];
        this.length=0;
    }
    push(...n)
    {
        n.forEach((el)=>{
            this.stack[this.length]=el
            this.length++
        })
        console.log(this.stack)
    }
    pop()
    {
        delete(this.stack[this.length-1])
        this.length--
        console.log(this.stack[this.length-1])
      
    }
    peek()
    {
        console.log(this.stack[this.length-1])
    }
    forEach()
    {
        this.stack.forEach((el)=>{
console.log(el+1)
        })
    }
   

}
let s1= new Stack()
s1.push(9,8,7,6,5)
s1.pop()
s1.pop()
s1.peek()
s1.push(10)
s1.peek()
s1.forEach()