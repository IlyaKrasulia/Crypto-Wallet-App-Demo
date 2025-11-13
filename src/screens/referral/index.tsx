import { SFlex } from 'components/Styled/SFlex';
import { SText } from 'components/Styled/SText';
import React, { useState } from 'react';
import {
  Image,
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, screenWidth } from 'utils/styles';
import ShareIcon from 'assets/icons/share.svg';
import { SButton } from 'components/Styled/SButton';
import { ReferalBottomSheet } from 'components/ReferalBottomSheet';
import { useHeaderHeight } from '@react-navigation/elements';
import { AppBackground } from 'components/Layout/AppBackground';
import QRCode from 'assets/images/test-qr.png';
import BottomShadow from '@assets/images/bottom-blur.png';
import i18n from 'utils/i18n.config';

const link = 'https://en.wikipedia.org/wiki/Bitcoin';

const Data = [
  {
    date: '03.01.2025',
    currency: 'BTC',
    name: 'Bitcoin',
    amount: 0.5,
    changePercentage: 2.3,
    changeAmount: 12,
  },
  {
    date: '03.01.2025',
    currency: 'ETH',
    name: 'Ethereum',
    amount: 1.2,
    changePercentage: -1.5,
    changeAmount: -15,
  },
  {
    date: '03.01.2025',
    currency: 'LTC',
    name: 'Litecoin',
    amount: 10,
    changePercentage: 0.8,
    changeAmount: 2.5,
  },
  {
    date: '02.01.2025',
    currency: 'XRP',
    name: 'Ripple',
    amount: 500,
    changePercentage: -0.7,
    changeAmount: -3.5,
  },
  {
    date: '02.01.2025',
    currency: 'ADA',
    name: 'Cardano',
    amount: 300,
    changePercentage: 1.2,
    changeAmount: 3.6,
  },
  {
    date: '01.01.2025',
    currency: 'DOGE',
    name: 'Dogecoin',
    amount: 1000,
    changePercentage: 5.0,
    changeAmount: 50,
  },
  {
    date: '01.01.2025',
    currency: 'SOL',
    name: 'Solana',
    amount: 20,
    changePercentage: -2.0,
    changeAmount: -4,
  },
  {
    date: '01.01.2025',
    currency: 'DOT',
    name: 'Polkadot',
    amount: 15,
    changePercentage: 3.1,
    changeAmount: 5.4,
  },
  {
    date: '31.12.2024',
    currency: 'MATIC',
    name: 'Polygon',
    amount: 50,
    changePercentage: 1.5,
    changeAmount: 2.3,
  },
  {
    date: '31.12.2024',
    currency: 'BNB',
    name: 'Binance Coin',
    amount: 8,
    changePercentage: -1.0,
    changeAmount: -3,
  },
];

export const Referal = () => {
  const { t } = i18n;
  const headerHeight = useHeaderHeight();

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
        <SFlex justifyContent={'center'} marginTop={16}>
          <View style={styles.qrWrapper}>
            <Image source={QRCode} />
          </View>
        </SFlex>
        <SText
          type={'b1'}
          color={Colors.Gray}
          textAlign={'center'}
          marginTop={14}
          marginBottom={12}
        >
          {t('screens.referal.yourLink')}
        </SText>
        <TouchableOpacity style={styles.button}>
          <SText color={Colors.White} type={'b1'}>
            {link}
          </SText>
          <SButton onPress={() => {}}>
            <ShareIcon />
          </SButton>
        </TouchableOpacity>
      </View>

      <ReferalBottomSheet
        viewHeight={viewHeight}
        walletName={'Wallet 1'}
        data={Data}
      />

      <Image source={BottomShadow} style={styles.bottomShadow} />
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },

  qrWrapper: {
    backgroundColor: Colors.White,
    padding: 13,
    borderRadius: 20,
    alignItems: 'center',
    width: 222,
    height: 222,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 24,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(246, 246, 246, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  bottomShadow: {
    position: 'absolute',
    bottom: 0,
    opacity: 1,
    width: screenWidth,
  },
});
