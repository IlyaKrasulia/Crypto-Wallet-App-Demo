import { AppLayout } from 'components/Layout/AppLayout';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SFlex } from 'components/Styled/SFlex';
import { SText } from 'components/Styled/SText';
import { Colors } from 'utils/styles';
import Line from '@assets/icons/dashed-line.svg';
import { CustomButton } from 'components/UI/CustomButton';
import { SView } from 'components/Styled/SView';
import { Trans } from 'react-i18next';
import i18n from 'utils/i18n.config';
import { useNavigation } from '@react-navigation/native';

interface IProps {
  sendData?: {
    crypto: string;
    network: string;
    amount: number;
  };
  receiveData?: {
    crypto: string;
    network: string;
    amount: number;
  };
  status?: 'pending' | 'succes';
  time?: string;
  date?: string;
  fee?: number;
}

export const SwapSuccessful = ({
  sendData = {
    crypto: 'null',
    network: 'null',
    amount: 0,
  },
  receiveData = {
    crypto: 'null',
    network: 'null',
    amount: 0,
  },
  status = 'pending',
  time = 'null',
  date = 'null',
  fee = 0,
}: IProps) => {
  const { t } = i18n;

  const navigation = useNavigation();

  return (
    <AppLayout>
      <View style={styles.container}>
        <SText
          type={'h3'}
          textAlign={'center'}
          color={Colors.White}
          marginBottom={8}
        >
          <Trans
            i18nKey={'screens.swapCrypto.cryptoOnWay'}
            components={{
              highlight: <Text style={styles.span} />,
            }}
          />
        </SText>
        <SText textAlign={'center'} color={Colors.Gray}>
          {t('screens.swapCrypto.thanksForPurchasing')}
        </SText>
        <View style={styles.infoWrapper}>
          <SFlex justifyContent={'space-between'} marginBottom={12}>
            <SText type={'b1'} color={Colors.LightGray}>
              {t('screens.swapCrypto.cryptoSend')}
            </SText>
            <SText type={'b1'} color={Colors.White}>
              {sendData.crypto}
            </SText>
          </SFlex>
          <SFlex justifyContent={'space-between'} marginBottom={12}>
            <SText type={'b1'} color={Colors.LightGray}>
              {t('screens.swapCrypto.network')}
            </SText>
            <SText type={'b1'} color={Colors.White}>
              {sendData.network}
            </SText>
          </SFlex>
          <SFlex justifyContent={'space-between'} marginBottom={12}>
            <SText type={'b1'} color={Colors.LightGray}>
              {t('screens.swapCrypto.ammount')}
            </SText>
            <SText type={'b1'} color={Colors.White}>
              {sendData.amount}
              {sendData.crypto}
            </SText>
          </SFlex>
          <Line width={'100%'} />
          <SFlex
            justifyContent={'space-between'}
            marginBottom={12}
            marginTop={12}
          >
            <SText type={'b1'} color={Colors.LightGray}>
              {t('screens.swapCrypto.cryptoReceive')}
            </SText>
            <SText type={'b1'} color={Colors.White}>
              {receiveData.crypto}
            </SText>
          </SFlex>
          <SFlex justifyContent={'space-between'} marginBottom={12}>
            <SText type={'b1'} color={Colors.LightGray}>
              {t('screens.swapCrypto.network')}
            </SText>
            <SText type={'b1'} color={Colors.White}>
              {receiveData.network}
            </SText>
          </SFlex>
          <SFlex justifyContent={'space-between'} marginBottom={12}>
            <SText type={'b1'} color={Colors.LightGray}>
              {t('screens.swapCrypto.ammount')}
            </SText>
            <SText type={'b1'} color={Colors.White}>
              {receiveData.amount}
              {receiveData.crypto}
            </SText>
          </SFlex>
          <Line width={'100%'} />
          <SFlex
            justifyContent={'space-between'}
            marginBottom={12}
            marginTop={12}
          >
            <SText type={'b1'} color={Colors.LightGray}>
              {t('screens.swapCrypto.paymentStatus')}
            </SText>
            <SText type={'b1'} color={Colors.White}>
              {status}
            </SText>
          </SFlex>
          <SFlex justifyContent={'space-between'} marginBottom={12}>
            <SText type={'b1'} color={Colors.LightGray}>
              {t('screens.swapCrypto.time')}
            </SText>
            <SText type={'b1'} color={Colors.PrimaryLight}>
              {date}
              {t('symbols./')}
              {time}
            </SText>
          </SFlex>
          <SFlex justifyContent={'space-between'} marginBottom={12}>
            <SText type={'b1'} color={Colors.LightGray}>
              {t('screens.swapCrypto.fee')}
            </SText>
            <SText type={'b1'} color={Colors.White}>
              {fee}
              {t('symbols.space')}
              {sendData.crypto}
            </SText>
          </SFlex>
        </View>
      </View>
      <SView marginLeft={16} marginRight={16} marginBottom={16}>
        <CustomButton
          text={'Back home'}
          onPress={() => navigation.navigate('MainTabs')}
        />
      </SView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  span: {
    color: Colors.Green,
    fontStyle: 'italic',
  },
  infoWrapper: {
    backgroundColor: Colors.InputBg,
    borderColor: Colors.LighterGray,
    borderWidth: 1,
    borderRadius: 24,
    padding: 24,
    marginTop: 21,
  },
});
