
// 之后要去查过没过期
const optionList = {
    'btcCall' :{showName: 'BTC-17000-CALL', underlyingAsset:'btc',isPut:false,expire:false,strike:17000, address:'0x7f8c3906F5cc3BaA8900c9cBB7A952d2B6B190A1'},
    'ethCall' :{showName:'ETH-1200-CALL',underlyingAsset:'eth',isPut:false,expire:false,strike:1200,address: '0x3fA49265C41F7be4432F7c6ead0970cc8fC99Eef'},
    'btcPut' : {showName:'BTC-17000-PUT',underlyingAsset:'btc',isPut:true,expire:false,strike:17000, address: '0x62E24d63F4907d25Db4D3388044eB76d9C6b6876'},
    'ethPut' : {showName:'ETH-1200-PUT',underlyingAsset:'eth',isPut:true,expire:false,strike:1200, address: '0x3f672388072d35591f78A53EceA86e2FD1E34690'},

} 
export default optionList