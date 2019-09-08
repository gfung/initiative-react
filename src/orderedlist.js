import React, { Component } from 'react';

function List(props) {
  return (
    <li id={props.id}>
      <div>
        <span>{props.name}</span>
        <span> - </span>
        <span>{props.number}</span>
        <span> - </span>
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
        if (a.number > b.number) {return -1}
        if (a.number < b.number) {return 1}
        return 0
      })
    })
  }

  remove(data){
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
    let number = parseInt(document.getElementById('number').value, 10);
    
    let tempid = this.state.id+1;
    this.setState({id: tempid})

    let tempArr = this.state.anArray;
    let tempLength = tempArr.length
    //define who should be at top
    let current = tempArr[0]
    //insert according to current order
    let position = 0;
    for (let i = 0;i < tempLength; i++) {
      if (number < tempArr[i].number) {
        position++
      }
    }
    // sort first
    this.sort()
    // do the insert
    this.state.anArray.splice(position,0,{name:name, number:number, id: this.state.id});
    // get original order of array
    let newArr = this.state.anArray;
    
    let newLength = newArr.length;
    if (current !== undefined){
      for (let i = 0;i < newLength;i++) {
        if (newArr[0].number !== current.number) {
          this.next()
        }
      }
    }
  }

  render() {
    let eleString=[];
    let tempNum = 0;
    for (let index = 0; index < this.state.anArray.length; index++) {
      eleString.push(<List key={tempNum} id={this.state.anArray[index].id} name={this.state.anArray[index].name} number={this.state.anArray[index].number} onClick={this.remove.bind(this,this.state.anArray[index].id)} />)
      tempNum++
    }
    return (
      <div class='grid-container'>
        
        <div style={{'text-align':'center'}}>D20 Initiative</div>
        <br></br>
        <div style={{'text-align':'center'}}>
          <label htmlFor="name">Name</label>
          <input id="name" type="string" name="name" />
          <label htmlFor="number">Number</label>
          <input id="number" type="number" name="number" />
          <button type="button" onClick={this.add} >Add</button>
          <button type="button" onClick={this.sort} >Sort</button>
        </div>
        <br></br>
        <div style={{'text-align':'center'}}>
          <button type="button" onClick={this.next} >Next</button>
        </div>
        <br></br>
        <div style={{'text-align':'center'}}>Current Turn : {this.state.anArray[0] ? this.state.anArray[0].name:""}</div>
        <ul style={{'text-align':'center', 'list-style': 'none'}}>{eleString}</ul>
      </div>
    )  
  }
}

export default OrderedList;
