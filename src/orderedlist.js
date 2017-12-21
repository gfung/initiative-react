import React, { Component } from 'react';

function List(props) {
  return (
    <li id={props.id}>
      <div>
        {props.name}
        <button type="button" onClick={props.onClick}>X</button>
      </div>
    </li>
  )
}

function input(props) {
  return (
    <input type={this.props.type} name={this.props.name} />
  )
}

class OrderedList extends Component {
  constructor(props){
    super(props);
    this.state ={
      anArray : [],
      id: 0
    };
    this.add= this.add.bind(this);
    this.remove= this.remove.bind(this);
    this.sort=this.sort.bind(this)
    this.next=this.next.bind(this)
  }

  next() {
    if(this.state.anArray.length>1){
      let whole = this.state.anArray
      let a = this.state.anArray[0]
      whole.splice(0,1)
      whole.push(a)
      this.setState({
        anArray: whole 
      })
    }
  }

  sort(){
    this.setState({
      anArray: this.state.anArray.sort((a,b)=>{
        if (a.number > b.number) {return 1}
        if (a.number < b.number) {return -1}
        return 0
      })
    })
  }

  remove(data){
    console.log(data)
    let tempArray = this.state.anArray
    for (let i = 0;i < tempArray.length;i++){
      if(tempArray[i].id === data){
        tempArray.splice(i,1)
      }
    }
    this.setState({
      anArray:tempArray
    })
  }

  add(){
    let name = document.getElementById('name').value;
    let number = document.getElementById('number').value;
    let tempid = this.state.id+1;
    
    this.setState({
      anArray: this.state.anArray.concat({name:name, number:number, id: this.state.id}),
      
    })
    this.setState({
      id: tempid
    })
  }

  render() {
    let eleString=[];
    let tempNum = 0;
    for (let index = 0; index < this.state.anArray.length; index++) {
      eleString.push(<List key={tempNum} id={this.state.anArray[index].id} name={this.state.anArray[index].name} onClick={this.remove.bind(this,this.state.anArray[index].id)} />)
      tempNum++
    }
    return (
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" type="string" name="name" />
        <label htmlFor="number">Number</label>
        <input id="number" type="number" name="number" />
        <button type="button" onClick={this.add} >Add</button>
        <button type="button" onClick={this.next} >Next</button>
        <button type="button" onClick={this.sort} >Sort</button>
        <ol>{eleString}</ol>
      </div>
    )  
  }
}

export default OrderedList;