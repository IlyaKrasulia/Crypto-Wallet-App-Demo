import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from 'utils/styles';
import { Trans } from 'react-i18next';
import i18n from 'utils/i18n.config';
import { SFlex } from './Styled/SFlex';
import { SText } from './Styled/SText';

interface IProps {
  type: 'general' | 'coin' | 'info';
  amount: number;
  profit: number;
  coin?: string;
  startValue?: number;
}

export const StakingBalance = ({
  type,
  amount,
  profit,
  coin,
  startValue,
}: IProps) => {
  const { t } = i18n;
  const [integerPart, fractionalPart] = amount.toFixed(2).split('.');

  return (
    <View style={styles.wrapper}>
      <SFlex justifyContent={'space-between'}>
        <SText color={Colors.Gray} type={'b1'}>
          {t('screens.staking.currentValue')}
        </SText>
        <SFlex>
          <SText color={Colors.Gray} type={'b1'}>
            {type === 'general' ? (
              <Trans
                i18nKey={'screens.staking.middleAPR'}
                values={{ data: profit }}
                components={{
                  highlight: <Text style={styles.span} />,
                }}
              />
            ) : (
              <Trans
                i18nKey={'screens.staking.profit'}
                values={{ data: profit }}
                components={{
                  highlight: <Text style={styles.span} />,
                }}
              />
            )}
          </SText>
        </SFlex>
      </SFlex>
      <SText color={Colors.White} type={'h1'} marginTop={19}>
        {type === 'general' && '$  '}
        {Number(integerPart).toLocaleString('en')}
        {Number(fractionalPart) !== 0 && (
          <>
            {t('symbols.dot')}
            <Text style={styles.span}>{fractionalPart}</Text>
          </>
        )}
        {type !== 'general' && ` ${coin}`}
      </SText>
      {type === 'info' && (
        <SText color={Colors.Gray} type={'b1'} marginTop={10}>
          {t('screens.staking.startValue', {startValue, coin})}
        </SText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.InputBg,
    borderColor: Colors.LighterGray,
    borderWidth: 1,
    borderRadius: 24,
    padding: 16,
  },
  span: {
    opacity: 0.5,
    color: Colors.LightGray,
  },
});
