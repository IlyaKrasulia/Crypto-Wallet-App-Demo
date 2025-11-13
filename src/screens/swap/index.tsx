import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { AppBackground } from 'components/Layout/AppBackground';
import { SwapConfirmation } from 'components/SwapConfirmation';
import { SwapCryproInput } from 'components/UI/SwapCryproInput';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const BALANCE = 1;

export const Swap = () => {
  const [value, setValue] = useState(0);
  const [isValid, setIsValid] = useState(false);

  const navigation = useNavigation();

  const headerHeight = useHeaderHeight();

  useEffect(() => {
    if (value > BALANCE || value <= 0) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [value]);
  return (
    <AppBackground>
      <ScrollView contentContainerStyle={[styles.container, { marginTop: headerHeight + 8 }]}>
        <SwapCryproInput
          onChange={(text) => setValue(Number(text))}
          balance={BALANCE}
          receiveData={{ crypto: 'BTC', amount: 0, network: 'TRC 20 (TRON)' }}
          sendData={{ crypto: 'ETH', amount: 0, network: 'TRC 20 (TRON)' }}
        />
      </ScrollView>
      <View style={styles.swapConfirmationWrapper}>
        <SwapConfirmation
          rate={'3,492 ETH = 0,35 Theta'}
          time={'3 January 2025, 16.07'}
          swapDetails={'ETH To Theta'}
          onSwipeComplete={() => navigation.navigate('Swap/Successful')}
          isValid={isValid}
        />
      </View>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexGrow: 1,
    paddingBottom: 250,
  },
  swapConfirmationWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
