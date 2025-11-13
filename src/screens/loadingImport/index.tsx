import { AppLayout } from 'components/Layout/AppLayout';
import { SFlex } from 'components/Styled/SFlex';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from 'utils/styles';
import CheckIcon from '@assets/icons/check.svg';
import { SText } from 'components/Styled/SText';
import { Loader } from 'components/UI/Loader';
import { useNavigation } from '@react-navigation/native';
import i18n from 'utils/i18n.config';

const STEPS: { title: string; step: number }[] = [
  { title: i18n.t('screens.loadingCreatingAccount.1'), step: 25 },
  { title: i18n.t('screens.loadingCreatingAccount.2'), step: 50 },
  { title: i18n.t('screens.loadingCreatingAccount.3'), step: 75 },
  { title: i18n.t('screens.loadingCreatingAccount.4'), step: 100 },
];

export const LoadingCreatingWallet = () => {
  const { navigate } = useNavigation();
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (value < 100) {
        setValue((prev) => prev + 25);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    value >= 100 && navigate('MainTabs');
  }, [navigate, value]);

  return (
    <AppLayout barStyle={'light-content'}>
      <View style={styles.wrapper}>
        <SFlex justifyContent={'center'}>
          <View style={styles.temp} />
        </SFlex>
        <SFlex flexDirection={'column'} alignItems={'flex-start'}>
          {STEPS.map((it, index, arr) => (
            <SFlex gap={12} alignItems={'center'} key={Math.random()}>
              {value >= it.step ? (
                <CheckIcon />
              ) : index !== 0 ? (
                value >= arr[index - 1].step ? (
                  <Loader color={Colors.Primary} />
                ) : (
                  <View style={styles.emptySpace} />
                )
              ) : (
                <Loader color={Colors.Primary} />
              )}
              <SText
                color={it.step <= value ? Colors.White : Colors.Gray}
                type={'h4'}
              >
                {it.title}
              </SText>
            </SFlex>
          ))}
        </SFlex>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 28,
    flex: 1,
    justifyContent: 'center',
  },
  temp: {
    width: 160,
    height: 160,
    borderRadius: 100,
    backgroundColor: Colors.Primary,
    marginBottom: 55,
  },
  emptySpace: {
    width: 20,
  },
});
