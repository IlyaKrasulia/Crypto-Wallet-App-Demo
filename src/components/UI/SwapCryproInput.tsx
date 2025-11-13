import { SFlex } from 'components/Styled/SFlex';
import { SText } from 'components/Styled/SText';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Colors, Fonts } from 'utils/styles';
import EthIcon from 'assets/icons/Ethereum.svg';
import ArrowDownIcon from 'assets/icons/arrow-down.svg';
import TradeIcon from '@assets/icons/trade.svg';
import { useNavigation } from '@react-navigation/native';
import { SButton } from 'components/Styled/SButton';
import i18n from 'utils/i18n.config';
import { SelectNetwork } from './SelectNetwork';

interface IProps {
  onChange: (value: string) => void;
  balance: number;
  sendData: {
    crypto: string;
    network: string;
    amount: number;
  };
  receiveData: {
    crypto: string;
    network: string;
    amount: number;
  };
}

export const SwapCryproInput = ({
  onChange,
  balance,
  sendData,
  receiveData,
}: IProps) => {
  const { t } = i18n;
  const { navigate } = useNavigation();
  const [isReversed, setIsReversed] = useState(false);

  const activeSendData = isReversed ? receiveData : sendData;
  const activeReceiveData = isReversed ? sendData : receiveData;

  return (
    <View>
      <View style={styles.inputWrapper}>
        <SFlex justifyContent={'space-between'}>
          <SText color={Colors.Gray} type={'s2'}>
            {t('screens.swapCrypto.yourAssets')}
          </SText>
          <SButton
            onPress={() => navigate('SelectCoin', { type: 'swap' })}
            styleBtn={styles.selectWrapper}
          >
            <View style={styles.iconWrapper}>
              <EthIcon width={16} height={16} />
            </View>
            <SText color={Colors.White} type={'b2'} marginStart={6}>
              {activeSendData?.crypto}
            </SText>
            <ArrowDownIcon />
          </SButton>
        </SFlex>
        <TextInput
          defaultValue={activeSendData?.amount.toString()}
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
      <SelectNetwork value={activeSendData?.network} />
      <SButton onPress={() => setIsReversed(!isReversed)}>
        <SFlex justifyContent={'center'} marginBottom={14}>
          <TradeIcon transform={'rotate(90)'} />
        </SFlex>
      </SButton>
      <View style={styles.inputWrapper}>
        <SFlex justifyContent={'space-between'}>
          <SText color={Colors.Gray} type={'s2'}>
            {t('screens.swapCrypto.swapAssets')}
          </SText>
          <SButton
            styleBtn={styles.selectWrapper}
            onPress={() => navigate('SelectCoin', { type: 'swap' })}
          >
            <View style={styles.iconWrapper}>
              <EthIcon width={16} height={16} />
            </View>
            <SText color={Colors.White} type={'b2'} marginStart={6}>
              {activeReceiveData?.crypto}
            </SText>
            <ArrowDownIcon />
          </SButton>
        </SFlex>
        <TextInput
          defaultValue={activeReceiveData?.amount.toString()}
          style={styles.input}
        />
        <SText color={Colors.Gray} marginTop={5} type={'s3'}>
          {activeReceiveData?.amount}
        </SText>
      </View>
      <SelectNetwork value={activeReceiveData?.network} />
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
