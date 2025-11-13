import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ArrowUpIcon from '@assets/icons/arrow-up-right.svg';
import { Colors } from 'utils/styles';
import i18n from 'utils/i18n.config';
import { SText } from './Styled/SText';
import { SFlex } from './Styled/SFlex';

interface IProps {
  amount: number;
  profit?: string;
  profitAmount?: string;
}

export const HomeBalance = ({
  amount,
  profit = '2,3% ',
  profitAmount = '(+$12)',
}: IProps) => {
  const { t } = i18n;
  const [integerPart, fractionalPart] = amount.toFixed(2).split('.');

  return (
    <View style={styles.blockWrapper}>
      <SText color={Colors.Gray} marginBottom={8}>
        {t('screens.home.currentValue')}
      </SText>
      <SFlex justifyContent={'space-between'} alignItems={'flex-end'}>
        <SText color={Colors.White} type={'h1'} marginTop={19}>
          {t('symbols.dollar')}
          {Number(integerPart).toLocaleString('en')}
          {Number(fractionalPart) !== 0 && (
            <>
              {t('symbols.dot')}
              <Text style={styles.span}>{fractionalPart}</Text>
            </>
          )}
        </SText>
        <SFlex alignItems={'center'}>
          <ArrowUpIcon />
          <SText color={Colors.White} type={'b2'}>
            {profit}
          </SText>
          <SText color={Colors.Gray} type={'b2'}>
            {profitAmount}
          </SText>
        </SFlex>
      </SFlex>
    </View>
  );
};

const styles = StyleSheet.create({
  blockWrapper: {
    borderColor: Colors.LighterGray,
    borderWidth: 1,
    backgroundColor: Colors.InputBg,
    borderRadius: 24,
    padding: 16,
  },
  span: {
    opacity: 0.5,
  },
});
