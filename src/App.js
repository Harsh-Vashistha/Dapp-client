
import './App.css';
import Web3 from 'web3'
import Signin from './Signin'
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom'

import React ,{Component} from 'react';
import Home from './pages/Home.js'
import {Chain_ABI,Chain_Address} from './config'
import AddProduct from './pages/AddProduct.js'
import CheckProduct from './pages/CheckProduct.js'


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
    const web3=new Web3(/*Web3.givenProvider ||*/ "http://127.0.0.1:7545")
    const network=await web3.eth.net.getNetworkType();
    //console.log("network ", network);
    const accounts=await web3.eth.getAccounts();
    this.setState({account:accounts[0]});
    const supplyChain=new web3.eth.Contract(Chain_ABI,Chain_Address);
    this.setState({supplyChain});
    console.log('supplychain',supplyChain);

    // retrieving data from blockchain aysn await pattern

    /* as productCount is public solidity automatically builds a function to retrieve data */
    const productCount=await supplyChain.methods.productCount().call();
    this.setState({productCount});

    /* retrieving all products from itemArray and display them */
    for(var i=1;i<=productCount;i++){
      const item=await supplyChain.methods.itemDetails(i).call();
      this.setState({
        items:[...this.state.items,item]
      })
    }

    console.log("item array is ",this.state.items);
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
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/add product' component={AddProduct}></Route>
          <Route exact path='/check product' component={CheckProduct}></Route>
        </Switch>
      </Router>
     
      
    </div>
  );
  }
}

export default App;
