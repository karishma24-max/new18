
let i=0

class Queue{
    constructor(){
        this.queue=[];
        
    }
length(){
   
let i=this.queue.length
return i
}


enqueue(n){
   
this.queue[this.length()]=n;
//console.log(this.length())

}
dequeue()
{
    this.queue.shift()
    
}
print()
{
    
    console.log(this.queue[0])
}
enQueueThree(...arr){
    console.log([...arr,...this.queue])
    

}
deQueueThree()
{
    if(this.length()==0)
    {
        console.log("Cannot delete! its Empty")
    }

   else if(this.length()==1)
    {
        this.queue.splice(0,1)
        //console.log(this.queue)
    }
 else 
 {
    
    this.queue.splice(0,2)

}

}
}
e1= new Queue()
e1.enqueue(7)
e1.enqueue(8)
e1.enqueue(76)
e1.enqueue(1)
e1.dequeue()
e1.print()
 e1.enqueue(3)
 e1.enqueue(7)

 e1.print()
e1.enQueueThree(11,12,13)
e1.deQueueThree()

e1.deQueueThree()
e1.deQueueThree()
e1.deQueueThree()