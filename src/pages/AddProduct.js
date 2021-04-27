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
import {
  MuiPickersUtilsProvider ,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import HDWalletProvider from "@truffle/hdwallet-provider"
import transitions from '@material-ui/core/styles/transitions';

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
    
    async function handleSubmit(){

        console.log("handle submit");
        const address="0x516B447E0FaaC89447E0a1fd1aA722cbD21D5015"
        const provider = new HDWalletProvider(privatekey, "https://ropsten.infura.io/v3/6741bd65e9ef41fbb8cc76b45b2d5350");
        const web3 =await new Web3(provider);
        

        const supplyChain=new web3.eth.Contract(Chain_ABI,Chain_Address);

        const accounts=await web3.eth.getAccounts()
        console.log("accounts ",accounts[0] );
        console.log(supplyChain);
        let tx=await supplyChain.methods.addProduct(productId,productName,manufacture,expiryDate,location).encodeABI();

        console.log("tx" ,tx);
        let transacationObj={
          gas:100000,
          data:tx,
          from:address,
        };
        let signedTransactionObj=await web3.eth.accounts.signTransaction(
          transacationObj,
          privatekey
        );

        let result=await web3.eth.sendSignedTransaction(
          signedTransactionObj.rawTransaction
        );

        console.log("product added")
    }
  const classes = useStyles();

  const [location,setlocation]=useState('');
  const [productId,setproductId]=useState('');
  const [productName,setproductName]=useState('');
  const [expiryDate,setexpiryDate]=useState(new Date('2022-08-18T21:11:54'));

  const newDate=new Date();
  const date=newDate.getDate();
  const month=newDate.getMonth()+1;
  const year=newDate.getFullYear();
  const  manufacture =date.toString()+'-'+month.toString()+'-'+year.toString();

  const handleDateChange = (date) => {
    setexpiryDate(date);
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography component="h2" variant="h2">
             <pre>   T-Checks
               </pre>
        </Typography>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Product
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
            label="product Name"
            required
            fullWidth
            autoFocus
            value={productName}
            onChange={(e)=>setproductName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="location"
            value={location}
            onChange={(e)=>setlocation(e.target.value)}
            autoComplete="location"
          />
         <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Product expiry date*"
          value={expiryDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
</MuiPickersUtilsProvider>
             <Button 
             fullWidth
             variant="contained"
             color="primary"
             className={classes.submit}
             onClick={handleSubmit}
             >
               Submit
            </Button>
      </div>
    </Container>
  );
}