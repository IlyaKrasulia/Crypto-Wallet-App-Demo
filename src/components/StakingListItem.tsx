import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from 'utils/styles';
import BitcoinIcon from '@assets/icons/bitcoin.svg';
import i18n from 'utils/i18n.config';
import { useNavigation } from '@react-navigation/native';
import { SFlex } from './Styled/SFlex';
import { SButton } from './Styled/SButton';
import { SText } from './Styled/SText';

interface IProps {
  currency: string;
  amount: number;
  profit: number;
  title: string;
  start?: string;
  end?: string;
  type: 'Available' | 'History';
}

const DATA = [
  {
    time: '12:53',
    date: '13.01.2025',
    currency: 'BTC',
    amount: 0.009,
  },
  {
    time: '12:53',
    date: '13.01.2025',
    currency: 'BTC',
    amount: 0.009,
  },
  {
    time: '12:53',
    date: '13.01.2025',
    currency: 'BTC',
    amount: 0.009,
  },
];

export const StakingListItem = ({
  currency,
  amount,
  profit,
  title,
  start,
  end,
  type,
}: IProps) => {
  const { t } = i18n;
  const { navigate } = useNavigation();

  const redirect = () => {
    if (type === 'Available') {
      navigate('StakingOption');
    } else {
      navigate('StakingInfo', {
        status: 'Finished',
        staked: true,
        currency,
        start: '10.01.2025',
        end: '13.01.2025',
        data: DATA,
      });
    }
  };

  return (
    <SButton styleBtn={styles.coinWrapper} onPress={redirect}>
      <SFlex gap={8}>
        <View style={styles.iconWrapper}>
          <BitcoinIcon />
        </View>
        <View>
          <SText color={Colors.White} type={'b1Medium'}>
            {currency}
          </SText>
          {title && (
            <SText color={Colors.Gray} type={'b1Medium'}>
              {title}
            </SText>
          )}
          {start && (
            <>
              <SText color={Colors.Gray} type={'b1'}>
                {t('screens.staking.start', { date: start })}
              </SText>
              <SText color={Colors.Gray} type={'b1'}>
                {t('screens.staking.end', { date: end })}
              </SText>
            </>
          )}
        </View>
      </SFlex>
      <SFlex flexDirection={'column'} alignItems={'flex-end'}>
        <SText color={Colors.White} type={'b1'} marginBottom={4}>
          {amount}
          {currency}
        </SText>
        <SText color={Colors.Gray} type={'b2'}>
          {t('screens.staking.apr', { data: profit.toString() })}
        </SText>
      </SFlex>
    </SButton>
  );
};

const styles = StyleSheet.create({
  coinWrapper: {
    borderColor: Colors.LighterGray,
    borderWidth: 1,
    borderRadius: 16,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconWrapper: {
    backgroundColor: Colors.InputBg,
    width: 44,
    height: 44,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
