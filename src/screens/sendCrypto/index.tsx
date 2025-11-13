import { SendCryptoConfirmation } from 'components/SendCryptoConfirmation';
import { AddressInput } from 'components/UI/Inputs/AddressInput';
import { SendCryptoInput } from 'components/UI/SendCryptoInput';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CameraIcon from '@assets/icons/camera.svg';
import { useHeaderHeight } from '@react-navigation/elements';
import { AppBackground } from 'components/Layout/AppBackground';
import { useNavigation } from '@react-navigation/native';

const BALANCE = 1;

export const SendCrypto = () => {
  const [value, setValue] = useState(0);
  const [isValid, setIsValid] = useState(true);

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
      <View style={[styles.container, { marginTop: headerHeight + 8 }]}>
        <SendCryptoInput
          amount={value}
          onChange={(text) => setValue(Number(text))}
          balance={BALANCE}
          crypto={'BTC'}
          network={'TRC 20'}
        />
        <AddressInput
          placeholder={'Enter adress'}
          defaultValue={'0'}
          onChangeText={() => {}}
          marginTop={10}
          rightElem={<CameraIcon />}
          onPressIcon={() =>
            navigation.navigate('ScanQr', { type: 'sendCrypto' })
          }
        />
      </View>
      <View style={styles.sendConfirmationWrapper}>
        <SendCryptoConfirmation
          fee={1}
          crypto={'BTC'}
          onSwipeComplete={() => navigation.navigate('SendCrypto/Successful')}
          isValid={isValid}
        />
      </View>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  sendConfirmationWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
});
