import React from 'react';
import { StyleSheet, View } from 'react-native';
import BTCIcon from '@assets/icons/bitcoin.svg';
import ArrowUp from '@assets/icons/arrow-up.svg';
import { Colors } from 'utils/styles';
import i18n from 'utils/i18n.config';
import SwapIcon from '@assets/icons/swap.svg';
import ClockIcon from '@assets/icons/clock.svg';
import { SFlex } from './Styled/SFlex';
import { SText } from './Styled/SText';

interface IProps {
  coin: string;
  amount: number;
  date: string;
  type: 'send' | 'receive' | 'swap';
  status?: 'pending' | undefined;
  swapAssets?: {
    coin: string;
    amount: number;
    fee: string;
  };
}

export const TransactionsItem = ({
  coin,
  amount,
  date,
  type,
  swapAssets,
  status,
}: IProps) => {
  const { t } = i18n;
  return (
    <View>
      <View style={styles.wrapper}>
        <SFlex justifyContent={'space-between'} marginBottom={5}>
          <SText color={Colors.White} type={'t1'} marginBottom={5}>
            {date}
          </SText>
          {status === 'pending' && (
            <SFlex gap={5}>
              <ClockIcon />
              <SText type={'t1Bold'} color={Colors.PrimaryLight}>
                {t('screens.swapCrypto.pending')}
              </SText>
            </SFlex>
          )}
        </SFlex>
        <SFlex justifyContent={'space-between'}>
          <View>
            <SFlex gap={3}>
              {type !== 'swap' && (
                <ArrowUp transform={type === 'receive' ? 'rotate(180)' : ''} />
              )}
              <BTCIcon />
              <SText color={Colors.White} type={'b1'}>
                {coin}
              </SText>
            </SFlex>
          </View>
          <View>
            <SText color={Colors.White} type={'t1'}>
              {t('screens.home.amount')}
            </SText>
            <SText color={Colors.White} type={'b1Medium'}>
              {amount}
            </SText>
          </View>
          <View>
            <SText color={Colors.White} type={'t1'}>
              {t('screens.home.fee')}
            </SText>
            <SText color={Colors.White} type={'b1Medium'}>
              {date}
            </SText>
          </View>
        </SFlex>
      </View>
      {type === 'swap' && (
        <>
          <SFlex justifyContent={'center'}>
            <View style={styles.swapIconWrapper}>
              <SwapIcon />
            </View>
          </SFlex>
          <View style={styles.wrapper}>
            <SFlex justifyContent={'space-between'}>
              <View>
                <SFlex gap={3}>
                  <BTCIcon />
                  <SText color={Colors.White} type={'b1'}>
                    {swapAssets?.coin}
                  </SText>
                </SFlex>
              </View>
              <View>
                <SText color={Colors.White} type={'t1'}>
                  {t('screens.home.amount')}
                </SText>
                <SText color={Colors.White} type={'b1Medium'}>
                  {swapAssets?.amount}
                </SText>
              </View>
              <View>
                <SText color={Colors.White} type={'t1'}>
                  {t('screens.home.fee')}
                </SText>
                <SText color={Colors.White} type={'b1Medium'}>
                  {swapAssets?.fee}
                </SText>
              </View>
            </SFlex>
            {status === 'pending' && (
              <SFlex marginTop={20} gap={9}>
                <View
                  style={[
                    styles.stepLine,
                    { borderColor: Colors.PrimaryLight },
                  ]}
                />
                <View style={styles.stepLine} />
                <View style={styles.stepLine} />
                <View style={styles.stepLine} />
              </SFlex>
            )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.InputBg,
    borderColor: Colors.LighterGray,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    justifyContent: 'space-between',
    marginBottom: 10,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  swapIconWrapper: {
    position: 'absolute',
    top: -22,
  },
  stepLine: {
    borderColor: Colors.LighterGray,
    borderWidth: 2,
    flex: 1,
  },
});
