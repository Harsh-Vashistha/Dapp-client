
import './App.css';
import Web3 from 'web3'
import Signin from './Signin'
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom'

import React ,{Component} from 'react';
import Home from './pages/Home.js'
import {Chain_ABI,Chain_Address} from './config'
import AddProduct from './pages/AddProduct.js'
import CheckProduct from './pages/CheckProduct.js'
import getWeb3 from "./getWeb3";
let web3;
class App extends Component {

  constructor(props){
    super(props)
    this.state={
      account:'',
      productCount:0,
      items:[]
    }
  }

  componentWillMount(){
    this.loadBlockchainData();
  }
  
  async loadBlockchainData(){
    
      //get network provider and web3 instance
      web3=await getWeb3();
      console.log("web3",web3);
      const networkId=await web3.eth.net.getId();
      const supplyChain=await new web3.eth.Contract(Chain_ABI,Chain_Address)
      const account=await web3.eth.getAccounts();
      console.log("accounts: ",account);
      this.setState({account});

      const productCount=await supplyChain.methods.productCount().call();
      this.setState({productCount});

      for(var i=1;i<=productCount;i++){
        const item=await supplyChain.methods.itemDetails(i).call();
        this.setState({
          items:[...this.state.items,item]
        })
      }
  
      console.log("item array is ",this.state.items);
    
    /* 
      for local blockchain

    const accounts=await web3.eth.getAccounts();
    this.setState({account:accounts[0]});
    //const supplyChain=new web3.eth.Contract(Chain_ABI,Chain_Address);
    this.setState({supplyChain});
    console.log('supplychain',supplyChain);


    //const productCount=await supplyChain.methods.productCount().call();
    this.setState({productCount});

    for(var i=1;i<=productCount;i++){
      const item=await supplyChain.methods.itemDetails(i).call();
      this.setState({
        items:[...this.state.items,item]
      })
    }

    console.log("item array is ",this.state.items);
    */
  }


  render(){
  return (
    <div className="App">
      {/* <h1>hello world</h1>
      <h6>account:{this.state.account}</h6>
      <h6>productCount:{this.state.productCount}</h6>
     {this.state.items.map((item,key)=>{
        return (<h6>{item.productName}</h6>)
      })} */}
      <Router>
        <Switch>
          <Route exact path='/' component={Home} web3={web3}></Route>
          <Route exact path='/add product' component={AddProduct} web3={web3}></Route>
          <Route exact path='/check product' component={CheckProduct} web3={web3}></Route>
        </Switch>
      </Router>
     
      
    </div>
  )};
}

export default App;
