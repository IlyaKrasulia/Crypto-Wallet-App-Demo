import { SFlex } from 'components/Styled/SFlex';
import { SView } from 'components/Styled/SView';
import { CustomButton } from 'components/UI/CustomButton';
import { SelectNetwork } from 'components/UI/SelectNetwork';
import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Colors } from 'utils/styles';
import ShareIcon from '@assets/icons/share.svg';
import { AppBackground } from 'components/Layout/AppBackground';

import imgQr from 'assets/images/test-qr.png';
import imgUsdt from 'assets/icons/usdt.png';
import { AddressInput } from 'components/UI/Inputs/AddressInput';
import CopyIcon from 'assets/icons/copy.svg';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ReceiveAddress: FunctionComponent = () => {
  const headerHeight = useHeaderHeight();

  const { bottom } = useSafeAreaInsets();

  return (
    <AppBackground>
      <View style={[styles.container, { marginTop: headerHeight + 8 }]}>
        <SFlex justifyContent={'center'}>
          <View style={styles.qrWrapper}>
            <Image source={imgQr} />
            <Image source={imgUsdt} style={styles.coinIcon} />
          </View>
        </SFlex>
        <SelectNetwork value={'TRC 20'} />
        <AddressInput
          placeholder={'Enter adress'}
          defaultValue={'https://en.wikipedia.org/wiki/Bitcoin'}
          onChangeText={() => {}}
          marginTop={10}
          editable={false}
          rightElem={<CopyIcon />}
        />
      </View>
      <SView marginLeft={16} marginRight={16} marginBottom={bottom + 16}>
        <CustomButton
          text={'Save or share address'}
          onPress={() => {}}
          rightIcon={<ShareIcon />}
        />
      </SView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    flex: 1,
  },
  qrWrapper: {
    backgroundColor: Colors.White,
    padding: 13,
    borderRadius: 20,
    alignItems: 'center',
    width: 222,
    height: 222,
    position: 'relative',
    marginBottom: 40,
  },
  coinIcon: {
    position: 'absolute',
    top: '50%',
  },
});
