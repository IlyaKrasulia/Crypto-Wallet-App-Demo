import { SFlex } from 'components/Styled/SFlex';
import React, { FunctionComponent, useState } from 'react';
import { Image, LayoutChangeEvent, StyleSheet, View } from 'react-native';
import TradeIcon from '@assets/icons/trade.svg';
import SendIcon from '@assets/icons/arrow-up.svg';
import BitcoinIcon from '@assets/icons/bitcoin.svg';
import { HomeBottomSheet } from 'components/HomeBottomSheet';
import { HomeButton } from 'components/UI/HomeButton';
import { HomeBalance } from 'components/HomeBalance';
import { BlurContainer } from 'components/Styled/BlurContainer';
import { screenWidth } from 'utils/styles';
import { useHeaderHeight } from '@react-navigation/elements';
import { AppBackground } from 'components/Layout/AppBackground';

import imgBottomBlur from 'assets/images/bottom-blur.png';
import { useNavigation } from '@react-navigation/native';

const DATA = [
  {
    date: '03.01.2025',
    currency: 'BTC',
    name: 'Bitcoin',
    amount: 0.5,
    changePercentage: 2.3,
    coinPrice: 100000,
    icon: <BitcoinIcon />,
  },
  {
    date: '03.01.2025',
    currency: 'ETH',
    name: 'Ethereum',
    amount: 1.2,
    changePercentage: -1.5,
    coinPrice: 15,
    icon: <BitcoinIcon />,
  },
  {
    date: '03.01.2025',
    currency: 'LTC',
    name: 'Litecoin',
    amount: 10,
    changePercentage: 0.8,
    coinPrice: 2.5,
    icon: <BitcoinIcon />,
  },
  {
    date: '02.01.2025',
    currency: 'XRP',
    name: 'Ripple',
    amount: 500,
    changePercentage: -0.7,
    coinPrice: 3.5,
    icon: <BitcoinIcon />,
  },
  {
    date: '02.01.2025',
    currency: 'ADA',
    name: 'Cardano',
    amount: 300,
    changePercentage: 1.2,
    coinPrice: 3.6,
    icon: <BitcoinIcon />,
  },
  {
    date: '01.01.2025',
    currency: 'DOGE',
    name: 'Dogecoin',
    amount: 1000,
    changePercentage: 5.0,
    coinPrice: 50,
    icon: <BitcoinIcon />,
  },
  {
    date: '01.01.2025',
    currency: 'SOL',
    name: 'Solana',
    amount: 20,
    changePercentage: -2.0,
    coinPrice: 4,
    icon: <BitcoinIcon />,
  },
  {
    date: '01.01.2025',
    currency: 'DOT',
    name: 'Polkadot',
    amount: 15,
    changePercentage: 3.1,
    coinPrice: 5.4,
    icon: <BitcoinIcon />,
  },
  {
    date: '31.12.2024',
    currency: 'MATIC',
    name: 'Polygon',
    amount: 50,
    changePercentage: 1.5,
    coinPrice: 2.3,
    icon: <BitcoinIcon />,
  },
  {
    date: '31.12.2024',
    currency: 'BNB',
    name: 'Binance Coin',
    amount: 8,
    changePercentage: -1.0,
    coinPrice: 3,
    icon: <BitcoinIcon />,
  },
];

export const Home: FunctionComponent = () => {
  const headerHeight = useHeaderHeight();

  const navigation = useNavigation();

  const [viewHeight, setViewHeight] = useState(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setViewHeight(height);
  };

  return (
    <AppBackground>
      <View
        style={[styles.container, { paddingTop: headerHeight }]}
        onLayout={handleLayout}
      >
        <HomeBalance amount={10000} />
        <BlurContainer padding={4} marginTop={10} radius={24}>
          <SFlex gap={4}>
            <HomeButton
              title={'Send'}
              icon={<SendIcon />}
              onPress={() =>
                navigation.navigate('SelectCoin', { type: 'send' })
              }
            />
            <HomeButton
              title={'Receive'}
              icon={<SendIcon transform={'rotate(180)'} />}
              onPress={() =>
                navigation.navigate('SelectCoin', { type: 'receive' })
              }
            />
            <HomeButton
              title={'Convert'}
              icon={<TradeIcon />}
              onPress={() => navigation.navigate('Swap')}
            />
          </SFlex>
        </BlurContainer>
      </View>
      {viewHeight ? (
        <HomeBottomSheet
          contenteight={viewHeight}
          walletName={'Wallet 1'}
          data={DATA}
        />
      ) : null}
      <Image source={imgBottomBlur} style={styles.bottomShadow} />
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  bottomShadow: {
    position: 'absolute',
    bottom: 0,
    opacity: 1,
    width: screenWidth,
  },
});
