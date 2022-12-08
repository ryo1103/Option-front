
// 之后要去查过没过期
const optionList = {
    'btcCall' :{underlyingAsset:'btc',isPut:false,expire:false,strike:17000, address:'0x82e01223d51Eb87e16A03E24687EDF0F294da6f1'},
    'ethCall' :{underlyingAsset:'eth',isPut:false,expire:false,strike:1200,address: '0x7969c5eD335650692Bc04293B07F5BF2e7A673C0'},
    'btcPut' : {underlyingAsset:'btc',isPut:true,expire:false,strike:17000, address: '0x2bdCC0de6bE1f7D2ee689a0342D76F52E8EFABa3'},
    'ethPut' : {underlyingAsset:'eth',isPut:true,expire:false,strike:1200, address: '0x7bc06c482DEAd17c0e297aFbC32f6e63d3846650'},

} 
export default optionList