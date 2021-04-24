import Web3 from "web3";
const getWeb3=()=>
    new Promise((resolve,reject)=>{
        //wait for loading completion to avoid race condition with web3 injection timing
        window.addEventListener("load",async()=>{
            //modern dapp browser....
            if(window.ethereum){
                console.log("mordern dapp browser");
                const web3=new Web3(window.ethereum);
                try{
                    //request account access if needed
                    await window.ethereum.enable();
                    //account now exposed
                    resolve(web3);
                }catch(error){
                    reject(error);
                }
            }
            //legacy dapp browsers....
            else if(window.web3){
                //use mist/metamask's provider.
                const web3=window.web3;
                console.log("injected web3 detected");
                resolve(web3);
            }
            //fallback to localhost; use dev console port by default...
            else{
                const provider=new Web3.providers.HttpProvider("http://127.0.0.1.8545");
                const web3=new Web3(provider);
                console.log("no web3 instace injected,using local web3");
                resolve(web3);
            }
        });
    });

    export default getWeb3;
