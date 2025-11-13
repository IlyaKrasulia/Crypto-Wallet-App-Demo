import { AppLayout } from 'components/Layout/AppLayout';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SFlex } from 'components/Styled/SFlex';
import { SText } from 'components/Styled/SText';
import { Colors } from 'utils/styles';
import Line from '@assets/icons/dashed-line.svg';
import { CustomButton } from 'components/UI/CustomButton';
import { SView } from 'components/Styled/SView';
import i18n from 'utils/i18n.config';
import { Trans } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

interface IProps {
  amount?: number;
  status?: 'Pending' | 'Succes';
  crypto?: string;
  network?: string;
  fee?: number;
  address?: string;
  time?: string;
  date?: string;
}

export const SendCryptoSuccessful = ({
  amount = 0,
  status = 'Pending',
  crypto = 'null',
  network = 'null',
  fee = 0,
  address = 'null',
  time = 'null',
  date = 'null',
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
        <View style={styles.infoWrapper}>
          <SFlex justifyContent={'space-between'} marginBottom={12}>
            <SText type={'b1'} color={Colors.LightGray}>
              {t('screens.swapCrypto.ammount')}
            </SText>
            <SText type={'b1'} color={Colors.White}>
              {amount}
              {t('symbols.space')}
              {crypto}
            </SText>
          </SFlex>
          <SFlex justifyContent={'space-between'} marginBottom={12}>
            <SText type={'b1'} color={Colors.LightGray}>
              {t('screens.swapCrypto.paymentStatus')}
            </SText>
            <SText type={'b1'} color={Colors.PrimaryLight}>
              {status}
            </SText>
          </SFlex>
          <Line width={'100%'} />
          <SFlex
            justifyContent={'space-between'}
            marginBottom={12}
            marginTop={12}
          >
            <SText type={'b1'} color={Colors.LightGray}>
              {t('screens.swapCrypto.crypto')}
            </SText>
            <SText type={'b1'} color={Colors.White}>
              {crypto}
            </SText>
          </SFlex>
          <SFlex justifyContent={'space-between'} marginBottom={12}>
            <SText type={'b1'} color={Colors.LightGray}>
              {t('screens.swapCrypto.network')}
            </SText>
            <SText type={'b1'} color={Colors.White}>
              {network}
            </SText>
          </SFlex>
          <SFlex justifyContent={'space-between'} marginBottom={12}>
            <SText type={'b1'} color={Colors.LightGray}>
              {t('screens.swapCrypto.fee')}
            </SText>
            <SText type={'b1'} color={Colors.White}>
              {fee}
            </SText>
          </SFlex>
          <SFlex justifyContent={'space-between'} marginBottom={12}>
            <SText type={'b1'} color={Colors.LightGray}>
              {t('screens.swapCrypto.address')}
            </SText>
            <SText type={'b1'} color={Colors.White}>
              {address}
            </SText>
          </SFlex>
          <SFlex justifyContent={'space-between'} marginBottom={12}>
            <SText type={'b1'} color={Colors.LightGray}>
              {t('screens.swapCrypto.time')}
            </SText>
            <SText type={'b1'} color={Colors.White}>
              {date}
              {t('symbols.space')}
              {t('symbols./')}
              {t('symbols.space')}
              {time}
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
