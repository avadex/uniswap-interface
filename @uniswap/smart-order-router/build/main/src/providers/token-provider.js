"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenProvider = exports.SEED_TOKENS = exports.WETH_POLYGON_MUMBAI = exports.DAI_POLYGON_MUMBAI = exports.USDC_POLYGON_MUMBAI = exports.WMATIC_POLYGON_MUMBAI = exports.DAI_POLYGON = exports.USDC_POLYGON = exports.WETH_POLYGON = exports.WMATIC_POLYGON = exports.UNI_ARBITRUM_RINKEBY = exports.USDC_ARBITRUM_RINKEBY = exports.USDT_ARBITRUM_RINKEBY = exports.DAI_ARBITRUM_RINKEBY = exports.DAI_ARBITRUM = exports.WBTC_ARBITRUM = exports.USDT_ARBITRUM = exports.USDC_ARBITRUM = exports.DAI_OPTIMISTIC_KOVAN = exports.WBTC_OPTIMISTIC_KOVAN = exports.USDT_OPTIMISTIC_KOVAN = exports.USDC_OPTIMISTIC_KOVAN = exports.DAI_OPTIMISM = exports.WBTC_OPTIMISM = exports.USDT_OPTIMISM = exports.USDC_OPTIMISM = exports.DAI_KOVAN = exports.WBTC_KOVAN = exports.USDT_KOVAN = exports.USDC_KOVAN = exports.DAI_GÖRLI = exports.WBTC_GÖRLI = exports.USDT_GÖRLI = exports.USDC_GÖRLI = exports.USDT_RINKEBY = exports.USDC_RINKEBY = exports.DAI_RINKEBY_2 = exports.DAI_RINKEBY_1 = exports.DAI_ROPSTEN = exports.USDT_ROPSTEN = exports.USDC_ROPSTEN = exports.FEI_MAINNET = exports.DAI_MAINNET = exports.WBTC_MAINNET = exports.USDT_MAINNET = exports.USDC_MAINNET = exports.DAI_AVALANCHE = exports.WBTC_AVALANCHE = exports.USDT_AVALANCHE = exports.USDC_AVALANCHE = exports.WAVAX = void 0;
const sdk_core_1 = require("@uniswap/sdk-core");
const lodash_1 = __importDefault(require("lodash"));
const v3_1 = require("../types/v3");
const util_1 = require("../util");
// Some well known tokens on each chain for seeding cache / testing.
exports.USDC_MAINNET = new sdk_core_1.Token(util_1.ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C');
exports.USDT_MAINNET = new sdk_core_1.Token(util_1.ChainId.MAINNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD');
exports.WBTC_MAINNET = new sdk_core_1.Token(util_1.ChainId.MAINNET, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 8, 'WBTC', 'Wrapped BTC');
exports.DAI_MAINNET = new sdk_core_1.Token(util_1.ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin');
exports.FEI_MAINNET = new sdk_core_1.Token(util_1.ChainId.MAINNET, '0x956F47F50A910163D8BF957Cf5846D573E7f87CA', 18, 'FEI', 'Fei USD');
exports.USDC_AVALANCHE = new sdk_core_1.Token(util_1.ChainId.AVALANCHE, '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664', 6, 'USDC', 'USD//C');
exports.USDT_AVALANCHE = new sdk_core_1.Token(util_1.ChainId.AVALANCHE, '0xc7198437980c041c805A1EDcbA50c1Ce5db95118', 6, 'USDT', 'Tether USD');
exports.WBTC_AVALANCHE = new sdk_core_1.Token(util_1.ChainId.AVALANCHE, '0x50b7545627a5162F82A992c33b87aDc75187B218', 8, 'WBTC', 'Wrapped BTC');
exports.DAI_AVALANCHE = new sdk_core_1.Token(util_1.ChainId.AVALANCHE, '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70', 18, 'DAI', 'Dai Stablecoin');
exports.WAVAX = new sdk_core_1.Token(util_1.ChainId.AVALANCHE, '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', 18, 'WAVAX', 'Wrapped AVAX');
exports.USDC_ROPSTEN = new sdk_core_1.Token(util_1.ChainId.ROPSTEN, '0x07865c6e87b9f70255377e024ace6630c1eaa37f', 6, 'USDC', 'USD//C');
exports.USDT_ROPSTEN = new sdk_core_1.Token(util_1.ChainId.ROPSTEN, '0x516de3a7a567d81737e3a46ec4ff9cfd1fcb0136', 6, 'USDT', 'Tether USD');
exports.DAI_ROPSTEN = new sdk_core_1.Token(util_1.ChainId.ROPSTEN, '0xad6d458402f60fd3bd25163575031acdce07538d', 18, 'DAI', 'Dai Stablecoin');
exports.DAI_RINKEBY_1 = new sdk_core_1.Token(util_1.ChainId.RINKEBY, '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea', 18, 'DAI', 'DAI');
exports.DAI_RINKEBY_2 = new sdk_core_1.Token(util_1.ChainId.RINKEBY, '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735', 18, 'DAI', 'DAI');
exports.USDC_RINKEBY = new sdk_core_1.Token(util_1.ChainId.RINKEBY, '0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b', 6, 'tUSDC', 'test USD//C');
exports.USDT_RINKEBY = new sdk_core_1.Token(util_1.ChainId.RINKEBY, '0xa689352b7c1cad82864beb1d90679356d3962f4d', 18, 'USDT', 'Tether USD');
exports.USDC_GÖRLI = new sdk_core_1.Token(util_1.ChainId.GÖRLI, '0x07865c6e87b9f70255377e024ace6630c1eaa37f', 6, 'USDC', 'USD//C');
exports.USDT_GÖRLI = new sdk_core_1.Token(util_1.ChainId.GÖRLI, '0xe583769738b6dd4e7caf8451050d1948be717679', 18, 'USDT', 'Tether USD');
exports.WBTC_GÖRLI = new sdk_core_1.Token(util_1.ChainId.GÖRLI, '0xa0a5ad2296b38bd3e3eb59aaeaf1589e8d9a29a9', 8, 'WBTC', 'Wrapped BTC');
exports.DAI_GÖRLI = new sdk_core_1.Token(util_1.ChainId.GÖRLI, '0x11fe4b6ae13d2a6055c8d9cf65c55bac32b5d844', 18, 'DAI', 'Dai Stablecoin');
exports.USDC_KOVAN = new sdk_core_1.Token(util_1.ChainId.KOVAN, '0x31eeb2d0f9b6fd8642914ab10f4dd473677d80df', 6, 'USDC', 'USD//C');
exports.USDT_KOVAN = new sdk_core_1.Token(util_1.ChainId.KOVAN, '0xa325f1b1ebb748715dfbbaf62e0c6677e137f45d', 18, 'USDT', 'Tether USD');
exports.WBTC_KOVAN = new sdk_core_1.Token(util_1.ChainId.KOVAN, '0xe36bc5d8b689ad6d80e78c3e736670e80d4b329d', 8, 'WBTC', 'Wrapped BTC');
exports.DAI_KOVAN = new sdk_core_1.Token(util_1.ChainId.KOVAN, '0x9dc7b33c3b63fc00ed5472fbd7813edda6a64752', 18, 'DAI', 'Dai Stablecoin');
exports.USDC_OPTIMISM = new sdk_core_1.Token(util_1.ChainId.OPTIMISM, '0x7F5c764cBc14f9669B88837ca1490cCa17c31607', 6, 'USDC', 'USD//C');
exports.USDT_OPTIMISM = new sdk_core_1.Token(util_1.ChainId.OPTIMISM, '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58', 6, 'USDT', 'Tether USD');
exports.WBTC_OPTIMISM = new sdk_core_1.Token(util_1.ChainId.OPTIMISM, '0x68f180fcCe6836688e9084f035309E29Bf0A2095', 8, 'WBTC', 'Wrapped BTC');
exports.DAI_OPTIMISM = new sdk_core_1.Token(util_1.ChainId.OPTIMISM, '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', 18, 'DAI', 'Dai Stablecoin');
exports.USDC_OPTIMISTIC_KOVAN = new sdk_core_1.Token(util_1.ChainId.OPTIMISTIC_KOVAN, '0x3b8e53b3ab8e01fb57d0c9e893bc4d655aa67d84', 6, 'USDC', 'USD//C');
exports.USDT_OPTIMISTIC_KOVAN = new sdk_core_1.Token(util_1.ChainId.OPTIMISTIC_KOVAN, '0x7F5c764cBc14f9669B88837ca1490cCa17c31607', 6, 'USDT', 'Tether USD');
exports.WBTC_OPTIMISTIC_KOVAN = new sdk_core_1.Token(util_1.ChainId.OPTIMISTIC_KOVAN, '0x2382a8f65b9120E554d1836a504808aC864E169d', 8, 'WBTC', 'Wrapped BTC');
exports.DAI_OPTIMISTIC_KOVAN = new sdk_core_1.Token(util_1.ChainId.OPTIMISTIC_KOVAN, '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', 18, 'DAI', 'Dai Stablecoin');
exports.USDC_ARBITRUM = new sdk_core_1.Token(util_1.ChainId.ARBITRUM_ONE, '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8', 6, 'USDC', 'USD//C');
exports.USDT_ARBITRUM = new sdk_core_1.Token(util_1.ChainId.ARBITRUM_ONE, '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', 6, 'USDT', 'Tether USD');
exports.WBTC_ARBITRUM = new sdk_core_1.Token(util_1.ChainId.ARBITRUM_ONE, '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f', 8, 'WBTC', 'Wrapped BTC');
exports.DAI_ARBITRUM = new sdk_core_1.Token(util_1.ChainId.ARBITRUM_ONE, '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', 18, 'DAI', 'Dai Stablecoin');
// export const DAI_ARBITRUM_RINKEBY = new Token(
//   ChainId.ARBITRUM_RINKEBY,
//   '0x2f3C1B6A51A469051A22986aA0dDF98466cc8D3c',
//   18,
//   'DAI',
//   'Dai Stablecoin'
// );
// higher liquidity in dai-weth pool on arb-rinkeby
exports.DAI_ARBITRUM_RINKEBY = new sdk_core_1.Token(util_1.ChainId.ARBITRUM_RINKEBY, '0x5364dc963c402aaf150700f38a8ef52c1d7d7f14', 18, 'DAI', 'Dai Stablecoin');
exports.USDT_ARBITRUM_RINKEBY = new sdk_core_1.Token(util_1.ChainId.ARBITRUM_RINKEBY, '0x920b9301c2de92186299cd2abc7199e25b9728b3', 6, 'UDST', 'Tether USD');
exports.USDC_ARBITRUM_RINKEBY = new sdk_core_1.Token(util_1.ChainId.ARBITRUM_RINKEBY, '0x09b98f8b2395d076514037ff7d39a091a536206c', 6, 'USDC', 'USD//C');
exports.UNI_ARBITRUM_RINKEBY = new sdk_core_1.Token(util_1.ChainId.ARBITRUM_RINKEBY, '0x049251a7175071316e089d0616d8b6aacd2c93b8', 18, 'UNI', 'Uni token');
//polygon tokens
exports.WMATIC_POLYGON = new sdk_core_1.Token(util_1.ChainId.POLYGON, '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', 18, 'WMATIC', 'Wrapped MATIC');
exports.WETH_POLYGON = new sdk_core_1.Token(util_1.ChainId.POLYGON, '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619', 18, 'WETH', 'Wrapped Ether');
exports.USDC_POLYGON = new sdk_core_1.Token(util_1.ChainId.POLYGON, '0x2791bca1f2de4661ed88a30c99a7a9449aa84174', 6, 'USDC', 'USD//C');
exports.DAI_POLYGON = new sdk_core_1.Token(util_1.ChainId.POLYGON, '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', 18, 'DAI', 'Dai Stablecoin');
//polygon mumbai tokens
exports.WMATIC_POLYGON_MUMBAI = new sdk_core_1.Token(util_1.ChainId.POLYGON_MUMBAI, '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889', 18, 'WMATIC', 'Wrapped MATIC');
exports.USDC_POLYGON_MUMBAI = new sdk_core_1.Token(util_1.ChainId.POLYGON_MUMBAI, '0xe11a86849d99f524cac3e7a0ec1241828e332c62', 6, 'USDC', 'USD//C');
exports.DAI_POLYGON_MUMBAI = new sdk_core_1.Token(util_1.ChainId.POLYGON_MUMBAI, '0x001b3b4d0f3714ca98ba10f6042daebf0b1b7b6f', 18, 'DAI', 'Dai Stablecoin');
exports.WETH_POLYGON_MUMBAI = new sdk_core_1.Token(util_1.ChainId.POLYGON_MUMBAI, '0xa6fa4fb5f76172d178d61b04b0ecd319c5d1c0aa', 18, 'WETH', 'Wrapped Ether');
exports.SEED_TOKENS = {
    [util_1.ChainId.MAINNET]: {
        WETH: util_1.WRAPPED_NATIVE_CURRENCY[util_1.ChainId.MAINNET],
        USDC: exports.USDC_MAINNET,
        USDT: exports.USDT_MAINNET,
        WBTC: exports.WBTC_MAINNET,
        DAI: exports.DAI_MAINNET,
    },
    [util_1.ChainId.AVALANCHE: {
        WAVAX: util_1.WRAPPED_NATIVE_CURRENCY[util_1.ChainId.AVALANCHE,
        USDC: exports.USDC_AVALANCHE,
        USDT: exports.USDT_AVALANCHE,
        WBTC: exports.WBTC_AVALANCHE,
        DAI: exports.DAI_AVALANCHE,
    },
    [util_1.ChainId.RINKEBY]: {
        WETH: util_1.WRAPPED_NATIVE_CURRENCY[util_1.ChainId.RINKEBY],
        DAI_1: exports.DAI_RINKEBY_1,
        DAI_2: exports.DAI_RINKEBY_2,
    },
    [util_1.ChainId.OPTIMISM]: {
        USDC: exports.USDC_OPTIMISM,
        USDT: exports.USDT_OPTIMISM,
        WBTC: exports.WBTC_OPTIMISM,
        DAI: exports.DAI_OPTIMISM,
    },
    [util_1.ChainId.OPTIMISTIC_KOVAN]: {
        USDC: exports.USDC_OPTIMISTIC_KOVAN,
        USDT: exports.USDT_OPTIMISTIC_KOVAN,
        WBTC: exports.WBTC_OPTIMISTIC_KOVAN,
        DAI: exports.DAI_OPTIMISTIC_KOVAN,
    },
    [util_1.ChainId.ARBITRUM_ONE]: {
        USDC: exports.USDC_ARBITRUM,
        USDT: exports.USDT_ARBITRUM,
        WBTC: exports.WBTC_ARBITRUM,
        DAI: exports.DAI_ARBITRUM,
    },
    [util_1.ChainId.ARBITRUM_RINKEBY]: {
        USDT: exports.USDT_ARBITRUM_RINKEBY,
        UNI: exports.UNI_ARBITRUM_RINKEBY,
        DAI: exports.DAI_ARBITRUM_RINKEBY,
        USDC: exports.USDC_ARBITRUM_RINKEBY,
    },
    [util_1.ChainId.POLYGON]: {
        WMATIC: exports.WMATIC_POLYGON,
        USDC: exports.USDC_POLYGON,
    },
    [util_1.ChainId.POLYGON_MUMBAI]: {
        WMATIC: exports.WMATIC_POLYGON_MUMBAI,
        DAI: exports.DAI_POLYGON_MUMBAI,
    },
};
class TokenProvider {
    constructor(chainId, multicall2Provider) {
        this.chainId = chainId;
        this.multicall2Provider = multicall2Provider;
    }
    async getTokens(_addresses, providerConfig) {
        const addressToToken = {};
        const symbolToToken = {};
        const addresses = lodash_1.default(_addresses)
            .map((address) => address.toLowerCase())
            .uniq()
            .value();
        if (addresses.length > 0) {
            const [symbolsResult, decimalsResult] = await Promise.all([
                this.multicall2Provider.callSameFunctionOnMultipleContracts({
                    addresses,
                    contractInterface: v3_1.IERC20Metadata__factory.createInterface(),
                    functionName: 'symbol',
                    providerConfig,
                }),
                this.multicall2Provider.callSameFunctionOnMultipleContracts({
                    addresses,
                    contractInterface: v3_1.IERC20Metadata__factory.createInterface(),
                    functionName: 'decimals',
                    providerConfig,
                }),
            ]);
            const { results: symbols } = symbolsResult;
            const { results: decimals } = decimalsResult;
            for (let i = 0; i < addresses.length; i++) {
                const address = addresses[i];
                const symbolResult = symbols[i];
                const decimalResult = decimals[i];
                if (!(symbolResult === null || symbolResult === void 0 ? void 0 : symbolResult.success) || !(decimalResult === null || decimalResult === void 0 ? void 0 : decimalResult.success)) {
                    util_1.log.info({
                        symbolResult,
                        decimalResult,
                    }, `Dropping token with address ${address} as symbol or decimal are invalid`);
                    continue;
                }
                const symbol = symbolResult.result[0];
                const decimal = decimalResult.result[0];
                addressToToken[address.toLowerCase()] = new sdk_core_1.Token(this.chainId, address, decimal, symbol);
                symbolToToken[symbol.toLowerCase()] =
                    addressToToken[address.toLowerCase()];
            }
            util_1.log.info(`Got token symbol and decimals for ${Object.values(addressToToken).length} out of ${addresses.length} tokens on-chain ${providerConfig ? `as of: ${providerConfig === null || providerConfig === void 0 ? void 0 : providerConfig.blockNumber}` : ''}`);
        }
        return {
            getTokenByAddress: (address) => {
                return addressToToken[address.toLowerCase()];
            },
            getTokenBySymbol: (symbol) => {
                return symbolToToken[symbol.toLowerCase()];
            },
            getAllTokens: () => {
                return Object.values(addressToToken);
            },
        };
    }
}
exports.TokenProvider = TokenProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4tcHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcHJvdmlkZXJzL3Rva2VuLXByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdEQUEwQztBQUMxQyxvREFBdUI7QUFDdkIsb0NBQXNEO0FBQ3RELGtDQUFnRTtBQThCaEUsb0VBQW9FO0FBQ3ZELFFBQUEsWUFBWSxHQUFHLElBQUksZ0JBQUssQ0FDbkMsY0FBTyxDQUFDLE9BQU8sRUFDZiw0Q0FBNEMsRUFDNUMsQ0FBQyxFQUNELE1BQU0sRUFDTixRQUFRLENBQ1QsQ0FBQztBQUNXLFFBQUEsWUFBWSxHQUFHLElBQUksZ0JBQUssQ0FDbkMsY0FBTyxDQUFDLE9BQU8sRUFDZiw0Q0FBNEMsRUFDNUMsQ0FBQyxFQUNELE1BQU0sRUFDTixZQUFZLENBQ2IsQ0FBQztBQUNXLFFBQUEsWUFBWSxHQUFHLElBQUksZ0JBQUssQ0FDbkMsY0FBTyxDQUFDLE9BQU8sRUFDZiw0Q0FBNEMsRUFDNUMsQ0FBQyxFQUNELE1BQU0sRUFDTixhQUFhLENBQ2QsQ0FBQztBQUNXLFFBQUEsV0FBVyxHQUFHLElBQUksZ0JBQUssQ0FDbEMsY0FBTyxDQUFDLE9BQU8sRUFDZiw0Q0FBNEMsRUFDNUMsRUFBRSxFQUNGLEtBQUssRUFDTCxnQkFBZ0IsQ0FDakIsQ0FBQztBQUNXLFFBQUEsV0FBVyxHQUFHLElBQUksZ0JBQUssQ0FDbEMsY0FBTyxDQUFDLE9BQU8sRUFDZiw0Q0FBNEMsRUFDNUMsRUFBRSxFQUNGLEtBQUssRUFDTCxTQUFTLENBQ1YsQ0FBQztBQUVXLFFBQUEsWUFBWSxHQUFHLElBQUksZ0JBQUssQ0FDbkMsY0FBTyxDQUFDLE9BQU8sRUFDZiw0Q0FBNEMsRUFDNUMsQ0FBQyxFQUNELE1BQU0sRUFDTixRQUFRLENBQ1QsQ0FBQztBQUNXLFFBQUEsWUFBWSxHQUFHLElBQUksZ0JBQUssQ0FDbkMsY0FBTyxDQUFDLE9BQU8sRUFDZiw0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
