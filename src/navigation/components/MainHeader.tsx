import { SButton } from 'components/Styled/SButton';
import React, { FunctionComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { SText } from 'components/Styled/SText';
import { Colors } from 'utils/styles';
import { SFlex } from 'components/Styled/SFlex';
import { useNavigation } from '@react-navigation/native';
import SettingsIcon from 'assets/icons/settings.svg';
import HistoryIcon from 'assets/icons/bitcoin-convert.svg';
import ArrowDown from 'assets/icons/arrow-down.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const WALLET_NAME = 'Wallet 1'

const MainHeader: FunctionComponent = () => {
  const { navigate } = useNavigation();

  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: safeAreaInsets.top }]}>
      <SButton onPress={() => navigate('Settings')} styleBtn={styles.headerBtn}>
        <SettingsIcon />
      </SButton>
      <SFlex flex={1} justifyContent={'center'}>
        <SButton onPress={() => navigate('Wallets')}>
          <SFlex alignItems={'center'} gap={10}>
            <SText color={Colors.White} type={'h3'}>
              {WALLET_NAME}
            </SText>
            <ArrowDown />
          </SFlex>
        </SButton>
      </SFlex>
      <SButton
        onPress={() => navigate('Transactions')}
        styleBtn={styles.headerBtn}
      >
        <HistoryIcon />
      </SButton>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerBtn: {
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: Colors.InputBg,
    borderWidth: 1,
    borderColor: Colors.LighterGray,
  },
});
