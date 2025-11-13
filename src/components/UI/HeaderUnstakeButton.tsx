import { SButton } from 'components/Styled/SButton';
import { SFlex } from 'components/Styled/SFlex';
import React from 'react';
import TrashIcon from '@assets/icons/trash.svg';
import { SText } from 'components/Styled/SText';
import i18n from 'utils/i18n.config';
import { Colors } from 'utils/styles';

interface IProps {
    onPress: () => void;
}

export const HeaderUnstakeButton = ({onPress}: IProps) => {
  const { t } = i18n;
  return (
    <SButton onPress={onPress}>
      <SFlex justifyContent={'center'} marginBottom={4}>
        <TrashIcon />
      </SFlex>
      <SText color={Colors.Red} textAlign={'center'} type={'b1'}>
        {t('screens.staking.unstake')}
      </SText>
    </SButton>
  );
};
