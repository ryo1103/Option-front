

const network = process.env.REACT_APP_ENV;

// export const graphUrl = process.env.REACT_APP_ENV === 'MAIN' ? 'https://test.mrbox.io/graphql' : 'http://ec2-18-183-85-152.ap-northeast-1.compute.amazonaws.com:3000/graphql';
export const graphUrl = 'https://test.mrbox.io/graphql';
// export const graphUrl = 'http://18.183.85.152/graphql';
export const explorers = {
  "avax": "https://testnet.snowtrace.io",
  "eth": "https://etherscan.io/"
}
export const maxAllowance = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
export const liquidityPool = '0xc5a5C42992dECbae36851359345FE25997F5C42d';
export const marketManager = '0x09635F643e140090A9A8Dcd712eD6285858ceBef';
export const traderList = {
                            'btcCall':'0x67d269191c92Caf3cD7723F116c85e6E9bf55933',
                            'btcPut':'0xE6E340D132b5f46d1e472DebcD681B2aBc16e57E',
                            'ethCall':'0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690',
                            'ethPut':'0x84eA74d481Ee0A5332c457a4d796187F6Ba67fEB'
                            }
export const options = {
                        'btcCall':'0x9E545E3C0baAB3E08CdfD552C960A1050f373042',
                        'btcPut':'0xa82fF9aFd8f496c3d6ac40E2a0F282E47488CFc9',
                        'ethCall':'0x1613beB3B2C4f22Ee086B2b38C1476A3cE7f78E8',
                        'ethPut':'0x851356ae760d987E095750cCeb3bC6014560891C'
                        }

export const usdt = '0x4A679253410272dd5232B3Ff7cF5dbB88f295319'
