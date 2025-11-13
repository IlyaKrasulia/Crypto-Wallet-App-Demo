import React from 'react';
import { SFlex } from 'components/Styled/SFlex';
import { SText } from 'components/Styled/SText';
import { StyleSheet, Text } from 'react-native';
import { Colors } from 'utils/styles';
import ArrowUpIcon from '@assets/icons/arrow-up-right.svg';
import i18n from 'utils/i18n.config';
import { SButton } from './Styled/SButton';

interface IProps {
  walletName: string;
  balance: number;
  onPress: () => void;
  profit?: string;
  profitAmount?: string;
}

export const SelectWalletItem = ({
  walletName,
  balance,
  onPress,
  profit = '2,3% ',
  profitAmount = '(+$12)',
}: IProps) => {
  const { t } = i18n;
  const [integerPart, fractionalPart] = balance.toFixed(2).split('.');

  return (
    <SButton styleBtn={styles.walletWrapper} onPress={onPress}>
      <SText color={Colors.White} type={'subtitle'}>
        {walletName}
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
    </SButton>
  );
};

const styles = StyleSheet.create({
  walletWrapper: {
    backgroundColor: Colors.InputBg,
    borderWidth: 1,
    borderColor: Colors.LighterGray,
    padding: 20,
    borderRadius: 24,
    width: '100%',
  },
  span: {
    opacity: 0.5,
  },
});
