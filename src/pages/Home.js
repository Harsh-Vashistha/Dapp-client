import React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Input from '../Input'
import Web3 from 'web3'
import {Chain_ABI,Chain_Address} from '../config'
import getWeb3 from "../getWeb3";



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link:{
      color:"white",
  },
  toolbar:{
    background : '#2E3B55'
  }, 
  card:{
    margin:'auto',
    justify:'center',
    alignContent:'center',
    alignItems:'center'
  }
}));



export default function ButtonAppBar(props) {
  const classes = useStyles();
  const [productId, setproductId] = useState('')
  const [productHistory,setproductHistory]=useState([]);
  const [productDetails,setproductDetails]=useState([]);

  const handleChange=(e)=>{
    setproductId(e.target.value);
  }

  async function handleClick(){
    const web3=await new Web3(window.ethereum);
    const accounts=await web3.eth.getAccounts();
    const supplyChain= await new web3.eth.Contract(Chain_ABI,Chain_Address);
    const history=await supplyChain.methods.getownerHistory(productId).call();
    const details=await supplyChain.methods.getPorductDetails(productId).call();
    setproductHistory(history);
    setproductDetails(details);
    console.log("product history are ",history);
    console.log("product details are ",details);

    /*
    console.log("handle submit");
    const web3=await new Web3("https://ropsten.infura.io/v3/6741bd65e9ef41fbb8cc76b45b2d5350")
    const network=web3.eth.net.getNetworkType();
    const accounts=await web3.eth.getAccounts()
    const supplyChain= await new web3.eth.Contract(Chain_ABI,Chain_Address);
    const history=await supplyChain.methods.getownerHistory(productId).call();
    const details=await supplyChain.methods.getPorductDetails(productId).call();
    setproductHistory(history);
    setproductDetails(details);
    console.log("product history are ",history);
    console.log("product details are ",details);
    */
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
              <Button component={Link} to='/add product' className={classes.link}>
                  Add product
              </Button>
          </Typography>
          <Typography variant="h6" className={classes.title}>
              <Button component={Link} to='/check product' className={classes.link}>  
                  Check Product
              </Button>
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <div className="searchfield">
      <Input id={1} label="Field label" Id={productId} onChange={handleChange}  locked={false} active={false}/>
      <div style={{padding:12}}>
      <Button color="primary" variant="contained" onClick={handleClick}>Search</Button>
      </div>
      </div>
      <div styles={classes.card}>
      {productDetails.length>0 && productDetails.id!=0?(
      <div style={{padding:10}}>
          <h1 style={{flex:0.5}}>{`${productDetails.productName}`}</h1>
          <h6>{`expiry:${productDetails.expiry}`}</h6>
        </div>
      ):(null)}
      </div>
      {productHistory.map((record,key)=>{
        return (
        <div styles={{padding:10}}>
            <h3>owner:{`${record.owner}`} </h3>
            <h6>{`purchase Date:${record.purchaseDate}     `}</h6>
        </div>
          // {/* <h6 key={key}>{record.owner}</h6></div>) */}
      )})
      }

    </div>
  );
}