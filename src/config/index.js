

const network = process.env.REACT_APP_ENV;

// export const graphUrl = process.env.REACT_APP_ENV === 'MAIN' ? 'https://test.mrbox.io/graphql' : 'http://ec2-18-183-85-152.ap-northeast-1.compute.amazonaws.com:3000/graphql';
export const graphUrl = 'https://test.mrbox.io/graphql';
// export const graphUrl = 'http://18.183.85.152/graphql';
export const explorers = {
  "avax": "https://testnet.snowtrace.io",
  "eth": "https://etherscan.io/"
}
export const maxAllowance = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
export const liquidityPool = '0x4c5859f0F772848b2D91F1D83E2Fe57935348029';
export const marketManager = '0x809d550fca64d94Bd9F66E60752A544199cfAC3D';
export const traderList = {
                            'btcCall':'0x1291Be112d480055DaFd8a610b7d1e203891C274',
                            'btcPut':'0x5f3f1dBD7B74C6B46e8c44f98792A1dAf8d69154',
                            'ethCall':'0xb7278A61aa25c888815aFC32Ad3cC52fF24fE575',
                            'ethPut':'0xCD8a1C3ba11CF5ECfa6267617243239504a98d90'
                            }
export const options = {
                        'btcCall':'0x82e01223d51Eb87e16A03E24687EDF0F294da6f1',
                        'btcPut':'0x2bdCC0de6bE1f7D2ee689a0342D76F52E8EFABa3',
                        'ethCall':'0x7969c5eD335650692Bc04293B07F5BF2e7A673C0',
                        'ethPut':'0x7bc06c482DEAd17c0e297aFbC32f6e63d3846650'
                        }

export const usdt = '0x5eb3Bc0a489C5A8288765d2336659EbCA68FCd00'

export const oracle = '0x36C02dA8a0983159322a80FFE9F24b1acfF8B570'
