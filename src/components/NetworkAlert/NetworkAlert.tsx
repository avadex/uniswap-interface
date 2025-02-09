import { Trans } from '@lingui/macro'
import { CHAIN_INFO } from 'constants/chainInfo'
import { SupportedChainId } from 'constants/chains'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ArrowUpRight } from 'react-feather'
import { useDarkModeManager } from 'state/user/hooks'
import styled from 'styled-components/macro'
import { ExternalLink, HideSmall } from 'theme'

import { AutoRow } from '../Row'

const L2Icon = styled.img`
  width: 46px;
  height: 46px;
  margin-right: 16px;
`

export const Controls = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  padding: 0 20px 20px 20px;
`

const BodyText = styled.div`
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 24px;
  font-size: 14px;
`
const RootWrapper = styled.div`
  position: relative;
  margin-top: 16px;
`

const SHOULD_SHOW_ALERT = {
  [SupportedChainId.OPTIMISM]: true,
  [SupportedChainId.OPTIMISTIC_KOVAN]: true,
  [SupportedChainId.AVALANCHE]: true,
  [SupportedChainId.ARBITRUM_RINKEBY]: true,
  [SupportedChainId.POLYGON]: true,
  [SupportedChainId.POLYGON_MUMBAI]: true,
}

type NetworkAlertChains = keyof typeof SHOULD_SHOW_ALERT

const BG_COLORS_BY_DARK_MODE_AND_CHAIN_ID: {
  [darkMode in 'dark' | 'light']: { [chainId in NetworkAlertChains]: string }
} = {
  dark: {
    [SupportedChainId.POLYGON]:
      'radial-gradient(100% 93.36% at 0% 6.64%, rgba(160, 108, 247, 0.1) 0%, rgba(82, 32, 166, 0.1) 100%)',
    [SupportedChainId.POLYGON_MUMBAI]:
      'radial-gradient(100% 93.36% at 0% 6.64%, rgba(160, 108, 247, 0.1) 0%, rgba(82, 32, 166, 0.1) 100%)',
    [SupportedChainId.OPTIMISM]:
      'radial-gradient(948% 292% at 42% 0%, rgba(255, 58, 212, 0.01) 0%, rgba(255, 255, 255, 0.04) 100%),radial-gradient(98% 96% at 2% 0%, rgba(255, 39, 39, 0.01) 0%, rgba(235, 0, 255, 0.01) 96%)',
    [SupportedChainId.OPTIMISTIC_KOVAN]:
      'radial-gradient(948% 292% at 42% 0%, rgba(255, 58, 212, 0.04) 0%, rgba(255, 255, 255, 0.04) 100%),radial-gradient(98% 96% at 2% 0%, rgba(255, 39, 39, 0.04) 0%, rgba(235, 0, 255, 0.01 96%)',
    [SupportedChainId.AVALANCHE]:
      'radial-gradient(285% 8200% at 30% 50%, rgba(40, 160, 240, 0.01) 0%, rgba(219, 255, 0, 0) 100%),radial-gradient(75% 75% at 0% 0%, rgba(150, 190, 220, 0.05) 0%, rgba(33, 114, 229, 0.05) 100%), hsla(0, 0%, 100%, 0.05)',
    [SupportedChainId.ARBITRUM_RINKEBY]:
      'radial-gradient(285% 8200% at 30% 50%, rgba(40, 160, 240, 0.05) 0%, rgba(219, 255, 0, 0) 100%),radial-gradient(75% 75% at 0% 0%, rgba(150, 190, 220, 0.05) 0%, rgba(33, 114, 229, 0.1) 100%), hsla(0, 0%, 100%, 0.05)',
  },
  light: {
    [SupportedChainId.POLYGON]:
      'radial-gradient(182.71% 205.59% at 2.81% 7.69%, rgba(130, 71, 229, 0.2) 0%, rgba(167, 202, 255, 0.2) 100%)',
    [SupportedChainId.POLYGON_MUMBAI]:
      'radial-gradient(182.71% 205.59% at 2.81% 7.69%, rgba(130, 71, 229, 0.2) 0%, rgba(167, 202, 255, 0.2) 100%)',
    [SupportedChainId.OPTIMISM]:
      'radial-gradient(92% 105% at 50% 7%, rgba(255, 58, 212, 0.04) 0%, rgba(255, 255, 255, 0.03) 100%),radial-gradient(100% 97% at 0% 12%, rgba(235, 0, 255, 0.1) 0%, rgba(243, 19, 19, 0.1) 100%), hsla(0, 0%, 100%, 0.1)',
    [SupportedChainId.OPTIMISTIC_KOVAN]:
      'radial-gradient(92% 105% at 50% 7%, rgba(255, 58, 212, 0.04) 0%, rgba(255, 255, 255, 0.03) 100%),radial-gradient(100% 97% at 0% 12%, rgba(235, 0, 255, 0.1) 0%, rgba(243, 19, 19, 0.1) 100%), hsla(0, 0%, 100%, 0.1)',
    [SupportedChainId.AVALANCHE]:
      'radial-gradient(285% 8200% at 30% 50%, rgba(40, 160, 240, 0.01) 0%, rgba(219, 255, 0, 0) 100%),radial-gradient(75% 75% at 0% 0%, rgba(150, 190, 220, 0.05) 0%, rgba(33, 114, 229, 0.05) 100%), hsla(0, 0%, 100%, 0.05)',
    [SupportedChainId.ARBITRUM_RINKEBY]:
      'radial-gradient(285% 8200% at 30% 50%, rgba(40, 160, 240, 0.1) 0%, rgba(219, 255, 0, 0) 100%),radial-gradient(circle at top left, hsla(206, 50%, 75%, 0.01), hsla(215, 79%, 51%, 0.12)), hsla(0, 0%, 100%, 0.1)',
  },
}
const BetaTag = styled.span<{ color: string }>`
  align-items: center;
  background-color: ${({ color }) => color};
  border-radius: 10px;
  color: ${({ theme }) => theme.white};
  display: flex;
  font-size: 20px;
  height: 36px;
  justify-content: center;
  left: -16px;
  position: absolute;
  transform: rotate(-20deg);
  top: -16px;
  width: 80px;
  z-index: 1;
`

const ContentWrapper = styled.div<{ chainId: NetworkAlertChains; darkMode: boolean; logoUrl: string }>`
  background: ${({ chainId, darkMode }) => BG_COLORS_BY_DARK_MODE_AND_CHAIN_ID[darkMode ? 'dark' : 'light'][chainId]};
  border-radius: 13px;
  box-shadow: rgb(0 247 113 / 41%) 0px 0px 20px -5px, 0px 24px 32px rgba(0, 0, 0, 0.01);
  display: flex;
  flex-direction: row;
  overflow: hidden;
  position: relative;
  width: 100%;

  :before {
    background-image: url(${({ logoUrl }) => logoUrl});
    background-repeat: no-repeat;
    background-size: 249px;
    content: '';
    height: 790px;
    opacity: 0.6;
    position: absolute;
    transform: rotate(18deg) translate(-90px, -40px);
    width: 340px;
    z-index: -1;
  }
`
const Header = styled.h2`
  font-weight: 400;
  font-size: 24px;
  margin: 0;
`

const LinkOutToBridge = styled(ExternalLink)`
  align-items: center;
  border-radius: 8px;
  color: white;
  display: flex;
  font-size: 16px;
  justify-content: space-between;
  padding: 6px 8px;
  margin-right: 12px;
  text-decoration: none !important;
  width: 100%;
`

const StyledArrowUpRight = styled(ArrowUpRight)`
  margin-left: 12px;
  width: 48px;
  height: 48px;
`

const TEXT_COLORS: { [chainId in NetworkAlertChains]: string } = {
  [SupportedChainId.POLYGON]: 'rgba(130, 71, 229)',
  [SupportedChainId.POLYGON_MUMBAI]: 'rgba(130, 71, 229)',
  [SupportedChainId.OPTIMISM]: '#ff3856',
  [SupportedChainId.OPTIMISTIC_KOVAN]: '#ff3856',
  [SupportedChainId.AVALANCHE]: '#788077',
  [SupportedChainId.ARBITRUM_RINKEBY]: '#0490ed',
}

function shouldShowAlert(chainId: number | undefined): chainId is NetworkAlertChains {
  return Boolean(chainId && SHOULD_SHOW_ALERT[chainId as unknown as NetworkAlertChains])
}

export function NetworkAlert() {
  const { chainId } = useActiveWeb3React()
  const [darkMode] = useDarkModeManager()

  if (!shouldShowAlert(chainId)) {
    return null
  }

  const { label, logoUrl, bridge } = CHAIN_INFO[chainId]
  const textColor = TEXT_COLORS[chainId]

  return bridge ? (
    <RootWrapper>
      <BetaTag color={'#2bd15e'}>Beta </BetaTag>
      <ContentWrapper chainId={chainId} darkMode={darkMode} logoUrl={logoUrl}>
        <LinkOutToBridge href={bridge}>
          <BodyText color={textColor}>
            <L2Icon src={logoUrl} />
            <AutoRow>
              <Header>
                <Trans>V3 on {label}</Trans>
              </Header>
              <HideSmall>
                <Trans>This is an Test release of Haydens V3 Code. Bridge ETH assets to the {label} network.</Trans>
              </HideSmall>
            </AutoRow>
          </BodyText>
          <StyledArrowUpRight color={textColor} />
        </LinkOutToBridge>
      </ContentWrapper>
    </RootWrapper>
  ) : null
}
