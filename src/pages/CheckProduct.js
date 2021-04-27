import React,{ useState,useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Chain_ABI,Chain_Address} from '../config'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Web3 from 'web3'
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import HDWalletProvider from "@truffle/hdwallet-provider"

let privatekey="796e29446be648eb1a99fb22600492778dec8b4f6263289e15ffdebe49a9c625"


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddProduct() {
    
    async function handleSubmit(e){
      const provider = new HDWalletProvider(privatekey, "https://ropsten.infura.io/v3/6741bd65e9ef41fbb8cc76b45b2d5350");
      const web3 = new Web3(provider);
      const accounts=await web3.eth.getAccounts();
      const supplyChain=new web3.eth.Contract(Chain_ABI,Chain_Address);
      console.log(supplyChain);
      const error=await supplyChain.methods.transferOwner(productId,buyerAccountAddress,purchaseDate).send({from:accounts[0],gas: 4712388,gasPrice: 100000000000})
      .then(function(receipt){
        // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
        console.log("receipt",receipt);
        window.alert("Ownership transfer successful")
        });

        seterror(error);
        console.log("error",error);
     }
  const classes = useStyles();

  const [buyerAccountAddress,setAddress]=useState('');
  const [productId,setproductId]=useState('');
  const [error,seterror]=useState('');

  const newDate=new Date();
  const date=newDate.getDate();
  const month=newDate.getMonth()+1;
  const year=newDate.getFullYear();
  const purchaseDate=date.toString()+'-'+month.toString()+'-'+year.toString();


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Check-in Product
        </Typography>
    
          <TextField
            variant="outlined"
            margin="normal"
            label="product Id"
            required
            fullWidth
            autoFocus
            value={productId}
            onChange={(e)=>setproductId(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Buyer Account Address"
            value={buyerAccountAddress}
            onChange={(e)=>setAddress(e.target.value)}
            autoComplete="Address"
          />

             <Button 
             fullWidth
             type="button"
             variant="contained"
             color="primary"
             className={classes.submit}
             onClick={handleSubmit}
             component={Link}
             to='/'
             >
               Done!
            </Button>

      </div>
    </Container>
  );
}