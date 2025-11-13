import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from 'utils/styles';
import BTCIcon from '@assets/icons/bitcoin.svg';
import ArrowUp from '@assets/icons/arrow-up.svg';
import i18n from 'utils/i18n.config';
import { SFlex } from './Styled/SFlex';
import { SText } from './Styled/SText';

interface IProps {
  time: string;
  date: string;
  currency: string;
  amount: number;
}

export const StakingInfoItem = ({ time, date, currency, amount }: IProps) => {
  const { t } = i18n;

  return (
    <View style={styles.wrapper}>
      <SFlex justifyContent={'space-between'} marginBottom={5}>
        <SText color={Colors.White} type={'t1'}>
          {time}
          {t('symbols./')}
          {date}
        </SText>
      </SFlex>
      <SFlex gap={100}>
        <View>
          <SFlex gap={3}>
            <ArrowUp transform={'rotate(180)'} />
            <BTCIcon />
            <SText color={Colors.White} type={'b1'}>
              {currency}
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
      </SFlex>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderColor: Colors.LighterGray,
    borderWidth: 1,
    borderRadius: 13,
    padding: 12,
    marginBottom: 13,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
});
