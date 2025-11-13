import { SButton } from 'components/Styled/SButton';
import { SFlex } from 'components/Styled/SFlex';
import { SText } from 'components/Styled/SText';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from 'utils/styles';
import TrashIcon from '@assets/icons/trash.svg';
import { BlurContainer } from 'components/Styled/BlurContainer';
import i18n from 'utils/i18n.config';
import { AppBackground } from 'components/Layout/AppBackground';
import { useHeaderHeight } from '@react-navigation/elements';

export const DeleteWallet = () => {
  const { t } = i18n;
  const headerHeight = useHeaderHeight();

  return (
    <AppBackground>
      <View style={[styles.container, { marginTop: headerHeight + 8 }]}>
        <BlurContainer
          padding={16}
          marginTop={20}
          radius={24}
          style={styles.blockWrapper}
        >
          <SText
            color={Colors.White}
            type={'h4Bold'}
            textAlign={'center'}
            marginBottom={40}
          >
            {t('screens.deleteWallet.title')}
          </SText>
          <SText color={Colors.White} type={'b1Medium'} marginBottom={40}>
            {t('screens.deleteWallet.desription')}
          </SText>
          <SButton onPress={() => {}} styleBtn={styles.button}>
            <SFlex justifyContent={'center'} gap={12}>
              <TrashIcon />
              <SText color={Colors.Red} type={'b1Medium'}>
                {t('screens.deleteWallet.deleteWallet')}
              </SText>
            </SFlex>
          </SButton>
        </BlurContainer>
      </View>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  blockWrapper: {
    gap: 8,
  },
  button: {
    backgroundColor: '#FFFFFF14',
    borderColor: Colors.LighterGray,
    borderWidth: 1,
    borderRadius: 24,
    padding: 18,
  },
});
