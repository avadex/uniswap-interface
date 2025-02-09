import { FeeAmount, Pool } from '@uniswap/v3-sdk';
import JSBI from 'jsbi';
import _ from 'lodash';
import { unparseFeeAmount } from '../../util/amounts';
import { ChainId, WRAPPED_NATIVE_CURRENCY } from '../../util/chains';
import { log } from '../../util/log';
import { DAI_AVALANCHE, DAI_ARBITRUM, DAI_ARBITRUM_RINKEBY, DAI_GÖRLI, DAI_KOVAN, DAI_MAINNET, DAI_OPTIMISM, DAI_OPTIMISTIC_KOVAN, DAI_POLYGON_MUMBAI, DAI_RINKEBY_1, DAI_RINKEBY_2, DAI_ROPSTEN, UNI_ARBITRUM_RINKEBY, USDC_AVALANCHE, USDC_ARBITRUM, USDC_GÖRLI, USDC_KOVAN, USDC_MAINNET, USDC_OPTIMISM, USDC_OPTIMISTIC_KOVAN, USDC_POLYGON, USDC_RINKEBY, USDC_ROPSTEN, USDT_AVALANCHE, USDT_ARBITRUM, USDT_ARBITRUM_RINKEBY, USDT_GÖRLI, USDT_KOVAN, USDT_MAINNET, USDT_OPTIMISM, USDT_OPTIMISTIC_KOVAN, USDT_RINKEBY, USDT_ROPSTEN, WBTC_AVALANCHE, WBTC_ARBITRUM, WBTC_GÖRLI, WBTC_KOVAN, WBTC_MAINNET, WBTC_OPTIMISM, WBTC_OPTIMISTIC_KOVAN, WETH_POLYGON, WAVAX, WMATIC_POLYGON, WMATIC_POLYGON_MUMBAI, } from '../token-provider';
const BASES_TO_CHECK_TRADES_AGAINST = {
    [ChainId.MAINNET]: [
        WRAPPED_NATIVE_CURRENCY[ChainId.MAINNET],
        DAI_MAINNET,
        USDC_MAINNET,
        USDT_MAINNET,
        WBTC_MAINNET,
    ],
    [ChainId.AVALANCHE]: [
        WRAPPED_NATIVE_CURRENCY[ChainId.AVALANCHE],
        DAI_AVALANCHE,
        USDC_AVALANCHE,
        USDT_AVALANCHE,
        WBTC_AVALANCHE,
    ],
    [ChainId.ROPSTEN]: [
        WRAPPED_NATIVE_CURRENCY[ChainId.ROPSTEN],
        DAI_ROPSTEN,
        USDT_ROPSTEN,
        USDC_ROPSTEN,
    ],
    [ChainId.RINKEBY]: [
        WRAPPED_NATIVE_CURRENCY[ChainId.RINKEBY],
        DAI_RINKEBY_1,
        DAI_RINKEBY_2,
        USDC_RINKEBY,
        USDT_RINKEBY,
    ],
    [ChainId.GÖRLI]: [
        WRAPPED_NATIVE_CURRENCY[ChainId.GÖRLI],
        USDT_GÖRLI,
        USDC_GÖRLI,
        WBTC_GÖRLI,
        DAI_GÖRLI,
    ],
    [ChainId.KOVAN]: [
        WRAPPED_NATIVE_CURRENCY[ChainId.KOVAN],
        USDC_KOVAN,
        USDT_KOVAN,
        WBTC_KOVAN,
        DAI_KOVAN,
    ],
    [ChainId.OPTIMISM]: [
        WRAPPED_NATIVE_CURRENCY[ChainId.OPTIMISM],
        USDC_OPTIMISM,
        DAI_OPTIMISM,
        USDT_OPTIMISM,
        WBTC_OPTIMISM,
    ],
    [ChainId.ARBITRUM_ONE]: [
        WRAPPED_NATIVE_CURRENCY[ChainId.ARBITRUM_ONE],
        WBTC_ARBITRUM,
        DAI_ARBITRUM,
        USDC_ARBITRUM,
        USDT_ARBITRUM,
    ],
    [ChainId.ARBITRUM_RINKEBY]: [
        WRAPPED_NATIVE_CURRENCY[ChainId.ARBITRUM_RINKEBY],
        DAI_ARBITRUM_RINKEBY,
        UNI_ARBITRUM_RINKEBY,
        USDT_ARBITRUM_RINKEBY,
    ],
    [ChainId.OPTIMISTIC_KOVAN]: [
        WRAPPED_NATIVE_CURRENCY[ChainId.OPTIMISTIC_KOVAN],
        DAI_OPTIMISTIC_KOVAN,
        WBTC_OPTIMISTIC_KOVAN,
        USDT_OPTIMISTIC_KOVAN,
        USDC_OPTIMISTIC_KOVAN,
    ],
    [ChainId.POLYGON]: [USDC_POLYGON, WETH_POLYGON, WMATIC_POLYGON],
    [ChainId.POLYGON_MUMBAI]: [
        DAI_POLYGON_MUMBAI,
        WRAPPED_NATIVE_CURRENCY[ChainId.POLYGON_MUMBAI],
        WMATIC_POLYGON_MUMBAI,
    ],
};
/**
 * Provider that uses a hardcoded list of V3 pools to generate a list of subgraph pools.
 *
 * Since the pools are hardcoded and the data does not come from the Subgraph, the TVL values
 * are dummys and should not be depended on.
 *
 * Useful for instances where other data sources are unavailable. E.g. Subgraph not available.
 *
 * @export
 * @class StaticV3SubgraphProvider
 */
export class StaticV3SubgraphProvider {
    constructor(chainId, poolProvider) {
        this.chainId = chainId;
        this.poolProvider = poolProvider;
    }
    async getPools(tokenIn, tokenOut) {
        log.info('In static subgraph provider for V3');
        const bases = BASES_TO_CHECK_TRADES_AGAINST[this.chainId];
        let basePairs = _.flatMap(bases, (base) => bases.map((otherBase) => [base, otherBase]));
        if (tokenIn && tokenOut) {
            basePairs.push([tokenIn, tokenOut], ...bases.map((base) => [tokenIn, base]), ...bases.map((base) => [tokenOut, base]));
        }
        const pairs = _(basePairs)
            .filter((tokens) => Boolean(tokens[0] && tokens[1]))
            .filter(([tokenA, tokenB]) => tokenA.address !== tokenB.address && !tokenA.equals(tokenB))
            .flatMap(([tokenA, tokenB]) => {
            return [
                [tokenA, tokenB, FeeAmount.LOWEST],
                [tokenA, tokenB, FeeAmount.LOW],
                [tokenA, tokenB, FeeAmount.MEDIUM],
                [tokenA, tokenB, FeeAmount.HIGH],
            ];
        })
            .value();
        log.info(`V3 Static subgraph provider about to get ${pairs.length} pools on-chain`);
        const poolAccessor = await this.poolProvider.getPools(pairs);
        const pools = poolAccessor.getAllPools();
        const poolAddressSet = new Set();
        const subgraphPools = _(pools)
            .map((pool) => {
            const { token0, token1, fee, liquidity } = pool;
            const poolAddress = Pool.getAddress(pool.token0, pool.token1, pool.fee);
            if (poolAddressSet.has(poolAddress)) {
                return undefined;
            }
            poolAddressSet.add(poolAddress);
            const liquidityNumber = JSBI.toNumber(liquidity);
            return {
                id: poolAddress,
                feeTier: unparseFeeAmount(fee),
                liquidity: liquidity.toString(),
                token0: {
                    id: token0.address,
                },
                token1: {
                    id: token1.address,
                },
                // As a very rough proxy we just use liquidity for TVL.
                tvlETH: liquidityNumber,
                tvlUSD: liquidityNumber,
            };
        })
            .compact()
            .value();
        return subgraphPools;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLXN1YmdyYXBoLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3Byb3ZpZGVycy92My9zdGF0aWMtc3ViZ3JhcGgtcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLElBQUksTUFBTSxNQUFNLENBQUM7QUFDeEIsT0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUNMLFlBQVksRUFDWixvQkFBb0IsRUFDcEIsU0FBUyxFQUNULFNBQVMsRUFDVCxXQUFXLEVBQ1gsWUFBWSxFQUNaLG9CQUFvQixFQUNwQixrQkFBa0IsRUFDbEIsYUFBYSxFQUNiLGFBQWEsRUFDYixXQUFXLEVBQ1gsb0JBQW9CLEVBQ3BCLGFBQWEsRUFDYixVQUFVLEVBQ1YsVUFBVSxFQUNWLFlBQVksRUFDWixhQUFhLEVBQ2IscUJBQXFCLEVBQ3JCLFlBQVksRUFDWixZQUFZLEVBQ1osWUFBWSxFQUNaLGFBQWEsRUFDYixxQkFBcUIsRUFDckIsVUFBVSxFQUNWLFVBQVUsRUFDVixZQUFZLEVBQ1osYUFBYSxFQUNiLHFCQUFxQixFQUNyQixZQUFZLEVBQ1osWUFBWSxFQUNaLGFBQWEsRUFDYixVQUFVLEVBQ1YsVUFBVSxFQUNWLFlBQVksRUFDWixhQUFhLEVBQ2IscUJBQXFCLEVBQ3JCLFlBQVksRUFDWixjQUFjLEVBQ2QscUJBQXFCLEdBQ3RCLE1BQU0sbUJBQW1CLENBQUM7QUFRM0IsTUFBTSw2QkFBNkIsR0FBbUI7SUFDcEQs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
