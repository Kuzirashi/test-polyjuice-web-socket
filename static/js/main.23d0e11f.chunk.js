(this["webpackJsonpweb-socket-balance-tracking"]=this["webpackJsonpweb-socket-balance-tracking"]||[]).push([[0],{255:function(e,t,n){},260:function(e,t){},262:function(e,t){},276:function(e,t){},278:function(e,t){},282:function(e,t){},286:function(e,t){},308:function(e,t){},310:function(e,t){},319:function(e,t){},32:function(e){e.exports=JSON.parse('{"nervos":{"ckb":{"url":"https://testnet.ckb.dev"},"godwoken":{"rpcUrl":"https://godwoken-testnet-web3-rpc.ckbapp.dev","wsUrl":"ws://godwoken-testnet-web3-rpc.ckbapp.dev/ws","networkId":"0x116e1"},"indexer":{"url":"https://testnet.ckb.dev/indexer"},"rollupTypeHash":"0x4cc2e6526204ae6a2e8fcf12f7ad472f41a1606d5b9624beebd215d780809f6a","rollupTypeScript":{"codeHash":"0x5c365147bb6c40e817a2a53e0dec3661f7390cc77f0c02db138303177b12e9fb","hashType":"type","args":"0x213743d13048e9f36728c547ab736023a7426e15a3d7d1c82f43ec3b5f266df2"},"ethAccountLockCodeHash":"0xdeec13a7b8e100579541384ccaf4b5223733e4a5483c3aec95ddc4c1d5ea5b22","depositLockScriptTypeHash":"0x5a2506bb68d81a11dcadad4cb7eae62a17c43c619fe47ac8037bc8ce2dd90360","portal_wallet_lock_hash":"0x58c5f491aba6d61678b7cf7edf4910b1f5e00ec0cde2f42e0abb4fd9aff25a63"},"ethereum":{"networkId":"0x4","fallback":{"rpcUrl":"","infura":{"apiKey":"808015861a3048648a41e56b23038945"}}}}')},321:function(e,t){},366:function(e,t){},379:function(e,t){},385:function(e,t){},392:function(e,t){},420:function(e,t){},422:function(e,t){},429:function(e,t){},430:function(e,t){},448:function(e,t){},580:function(e,t,n){"use strict";n.r(t);var a=n(9),o=n.n(a),s=n(241),c=n.n(s),l=(n(255),n(74));let i;!function(e){e.requestAccounts="eth_requestAccounts",e.requestWallet="wallet_requestPermissions",e.watchAsset="wallet_watchAsset",e.switchNetwork="wallet_switchEthereumChain",e.accountsChanged="accountsChanged"}(i||(i={}));var u=n(14);const d=({onConnect:e})=>{const[t,n]=o.a.useState("Click here to install MetaMask!"),[a,s]=o.a.useState(!1),[c,d]=o.a.useState([]),r=o.a.useRef(),p=t=>{const[n]=t;d(t),e(n)};o.a.useEffect((()=>{r.current||(r.current=new l.a)}),[]),o.a.useEffect((()=>{var e;(console.log("effect"),l.a.isMetaMaskInstalled())&&(console.log("metamask installed"),c.length>0?(console.log("connect"),n("Connected"),s(!0),null===(e=r.current)||void 0===e||e.stopOnboarding()):(console.log("connected"),n("Connect"),s(!1)))}),[c]),o.a.useEffect((()=>{if(l.a.isMetaMaskInstalled())return window.ethereum.request({method:i.requestAccounts}).then(p),window.ethereum.on(i.accountsChanged,p),()=>{window.ethereum.off(i.accountsChanged,p)}}),[]);return Object(u.jsx)("button",{disabled:a,onClick:()=>{var e;l.a.isMetaMaskInstalled()?window.ethereum.request({method:i.requestAccounts}).then((e=>p(e))):null===(e=r.current)||void 0===e||e.startOnboarding()},children:t})},r=({label:e,onClick:t,onChange:n,value:a,placeholder:o})=>Object(u.jsxs)("div",{style:{display:"flex",border:"1px solid black",justifyContent:"space-between",padding:8},children:[Object(u.jsx)("input",{onChange:e=>{const t=Number(e.target.value);n(t)},value:a,placeholder:o}),Object(u.jsx)("button",{onClick:t,children:e})]});var p=n(243),b=n(245),f=n(32),y=n(38),m=n.n(y),h=n(92);var w=()=>{const[e,t]=o.a.useState(null),[n,s]=o.a.useState(null),[c,l]=o.a.useState(null),[i,y]=o.a.useState(null),[w,v]=o.a.useState(null),[g,k]=o.a.useState(null),[x,j]=o.a.useState(0),C=(e=>{const[t,n]=Object(a.useState)(null),o={timeout:3e4,clientConfig:{maxReceivedFrameSize:1e8,maxReceivedMessageSize:1e8,keepalive:!0,keepaliveInterval:6e4},reconnect:{auto:!0,delay:5e3,maxAttempts:5,onTimeout:!1}};return Object(a.useEffect)((()=>{if(e){const e=new p.PolyjuiceWebsocketProvider(f.nervos.godwoken.wsUrl,{rollupTypeHash:f.nervos.rollupTypeHash,ethAccountLockCodeHash:f.nervos.ethAccountLockCodeHash,web3Url:f.nervos.godwoken.rpcUrl},o);e.setMultiAbi([h.abi]);const t=new m.a(e);n(t)}}),[e]),t})(e),O=(e=>{const[t,n]=Object(a.useState)(null);return Object(a.useEffect)((()=>{if(e){const e=new b.PolyjuiceWebsocketProvider({rollupTypeHash:f.nervos.rollupTypeHash,ethAccountLockCodeHash:f.nervos.ethAccountLockCodeHash,web3Url:f.nervos.godwoken.rpcUrl},f.nervos.godwoken.wsUrl);e.on("block",(()=>console.log("block new"))),n(e)}}),[e]),t})(e),S=((e,t)=>{const[n,o]=Object(a.useState)();return Object(a.useEffect)((()=>{if(t){const n=new t.eth.Contract(h.abi,e);o(n),console.log("erc20 connected",n)}}),[e,t]),n})("0x0815b0d4e58c8e707a85e774c37cab65480f66e9",C);C&&C.eth.subscribe("newBlockHeaders",(async(e,t)=>{e?console.error(e):s(t.number)})),O&&(console.log("ethers",O),O.on("block",(e=>{console.log("ethers New Block from ethers:",e)})));return o.a.useEffect((()=>{!async function(){if(C){const e=await C.eth.getBlockNumber();s(e)}}()}),[C]),o.a.useEffect((()=>{console.log("erc20",S),S&&(console.log("get balance"),async function(){console.log("erc20",null===S||void 0===S?void 0:S.options.address);const t=await(null===S||void 0===S?void 0:S.methods.balanceOf(e).call()),n=await(null===S||void 0===S?void 0:S.methods.decimals().call());console.log("balance",t),console.log("decimals",n),v(t),k(m.a.utils.toNumber(n))}())}),[S]),o.a.useEffect((()=>{!async function(){if(O&&e){const t=await(null===O||void 0===O?void 0:O.getBalance(e));console.log("fetchCkbBalance",t),y(t.toBigInt())}}()}),[e,O]),o.a.useEffect((()=>{n&&async function(){console.log("erc20",null===S||void 0===S?void 0:S.options.address);const t=await(null===S||void 0===S?void 0:S.methods.balanceOf(e).call()),n=await(null===S||void 0===S?void 0:S.methods.decimals().call());console.log("balance",t),console.log("decimals",n),v(t),k(m.a.utils.toNumber(n))}()}),[n]),Object(u.jsx)("div",{style:{display:"flex"},children:Object(u.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[Object(u.jsx)("h1",{children:"Wrapped CKB on Godwoken Testnet"}),Object(u.jsx)("br",{}),Object(u.jsx)("br",{}),Object(u.jsx)(d,{onConnect:e=>{console.log("on connect"),t(e)}}),Object(u.jsx)("br",{}),Object(u.jsxs)("div",{children:["Account: ",e||void 0]}),Object(u.jsxs)("div",{style:{marginTop:16,marginBottom:16},children:["Godwoken Testnet balances:",Object(u.jsxs)("div",{style:{marginBottom:8,marginTop:8},children:["CKB Balance: ",null===i||void 0===i?void 0:i.toString()," Shannons"]}),Object(u.jsxs)("div",{style:{marginBottom:8},children:["wCKB Balance: ",w," Shannons"]}),Object(u.jsx)(r,{label:"Deposit CKB to get wCKB",value:x,onClick:async()=>{if(console.log("deposit"),g){const t=m.a.utils.toBN(x).mul(m.a.utils.toBN(10).pow(m.a.utils.toBN(g)));console.log("deposit amount",t.toString());const n=await(null===S||void 0===S?void 0:S.methods.deposit().send({from:e,value:t}));console.log("transaction hash",n),l(n);const a=await(null===S||void 0===S?void 0:S.methods.balanceOf(e).call());console.log("balance",a)}},onChange:e=>j(e)}),"The above value is in CKB unit (not in Shannons). Refresh the page after sending transaction."]})]})})};var v=e=>{e&&e instanceof Function&&n.e(3).then(n.bind(null,585)).then((({getCLS:t,getFID:n,getFCP:a,getLCP:o,getTTFB:s})=>{t(e),n(e),a(e),o(e),s(e)}))};c.a.render(Object(u.jsx)(o.a.StrictMode,{children:Object(u.jsx)(w,{})}),document.getElementById("root")),v()},92:function(e){e.exports=JSON.parse('{"abi":[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}]}')}},[[580,1,2]]]);
//# sourceMappingURL=main.23d0e11f.chunk.js.map