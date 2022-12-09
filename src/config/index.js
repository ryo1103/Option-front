

const network = process.env.REACT_APP_ENV;

// export const graphUrl = process.env.REACT_APP_ENV === 'MAIN' ? 'https://test.mrbox.io/graphql' : 'http://ec2-18-183-85-152.ap-northeast-1.compute.amazonaws.com:3000/graphql';
export const graphUrl = 'https://test.mrbox.io/graphql';
// export const graphUrl = 'http://18.183.85.152/graphql';
export const explorers = {
  "avax": "https://testnet.snowtrace.io",
  "eth": "https://etherscan.io/"
}
export const maxAllowance = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
export const liquidityPool = '0x5631b6AEc2CBb1C10FCF9DF1fFa8b217dc133ce1';
export const marketManager = '0xBb3B941bFED46B986eA0A9e05F3790f9246412C2';
export const traderList = {
                            'btcCall':'0xa2B9635e2cc844484a0a1E7D64C76473Db993081',
                            'btcPut':'45a5a76E3423F640527C58a7523516FCa19BAbfB',
                            'ethCall':'0x040358b53B86D1975f5FAE219e19B6D8147f8289',
                            'ethPut':'0x8E8Efdf930C0d9208aDcB07E429dE6b1505F07b0'
                            }
export const options = {
                        'btcCall':'0x7f8c3906F5cc3BaA8900c9cBB7A952d2B6B190A1',
                        'btcPut':'0x62E24d63F4907d25Db4D3388044eB76d9C6b6876',
                        'ethCall':'0x3fA49265C41F7be4432F7c6ead0970cc8fC99Eef',
                        'ethPut':'0x3f672388072d35591f78A53EceA86e2FD1E34690'
                        }

export const usdt = '0x2366176DD9b7Bf4680FD34dB644B03463accf74d'
export const oracle = '0xE19b71d4d86845e7aebea5d6e01A4Aa1A9e11827'
