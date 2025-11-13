import { SFlex } from 'components/Styled/SFlex';
import { SText } from 'components/Styled/SText';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Colors, Fonts } from 'utils/styles';
import EthIcon from 'assets/icons/Ethereum.svg';
import ArrowDownIcon from 'assets/icons/arrow-down.svg';
import { SButton } from 'components/Styled/SButton';
import i18n from 'utils/i18n.config';
import { SelectNetwork } from './SelectNetwork';

interface IProps {
  onChange: (value: string) => void;
  balance: number;
  crypto: string;
  network: string;
  amount: number;
}

export const SendCryptoInput = ({
  onChange,
  balance,
  crypto,
  network,
  amount,
}: IProps) => {
  const { t } = i18n;
  // const { navigate } = useNavigation();
  return (
    <View>
      <View style={styles.inputWrapper}>
        <SFlex justifyContent={'space-between'}>
          <SText color={Colors.Gray} type={'s2'}>
            {t('screens.swapCrypto.yourAssets')}
          </SText>
          <SButton onPress={() => {}} styleBtn={styles.selectWrapper}>
            <View style={styles.iconWrapper}>
              <EthIcon width={16} height={16} />
            </View>
            <SText color={Colors.White} type={'b2'} marginStart={6}>
              {crypto}
            </SText>
            <ArrowDownIcon />
          </SButton>
        </SFlex>
        <TextInput
          defaultValue={amount.toString()}
          onChangeText={(text) => onChange(text)}
          keyboardType={'numeric'}
          style={styles.input}
        />
        <SFlex justifyContent={'space-between'}>
          <SText color={Colors.Gray} marginTop={5} type={'s3'}>
            {t('screens.swapCrypto.balance', { balance, currency: 'BTC' })}
          </SText>
          <SText color={Colors.White} type={'h4'}>
            {t('buttons.max')}
          </SText>
        </SFlex>
      </View>
      <SelectNetwork value={network} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    borderColor: Colors.LighterGray,
    backgroundColor: Colors.InputBg,
    borderWidth: 1,
    borderRadius: 24,
    padding: 16,
    marginBottom: 6,
  },
  input: {
    color: Colors.White,
    fontSize: 40,
    fontFamily: Fonts.bold,
  },
  selectWrapper: {
    borderColor: Colors.LighterGray,
    backgroundColor: Colors.InputBg,
    borderWidth: 1,
    borderRadius: 24,
    padding: 4,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconWrapper: {
    borderWidth: 1,
    borderColor: Colors.LighterGray,
    backgroundColor: Colors.InputBg,
    justifyContent: 'center',
    alignItems: 'center',
    width: 28,
    height: 28,
    borderRadius: 100,
  },
});
