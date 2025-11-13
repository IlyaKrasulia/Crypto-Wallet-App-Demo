import { SFlex } from 'components/Styled/SFlex';
import React, { ReactNode, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Colors } from 'utils/styles';
import { SButton } from 'components/Styled/SButton';
import { SText } from 'components/Styled/SText';
import ArrowIcon from '@assets/icons/show-arrow.svg';
import ChechIcon from '@assets/icons/check-blue.svg';
import i18n from 'utils/i18n.config';

interface IProps {
  type?: 'chooseLanguage' | 'accent';
  title: string;
  icon: ReactNode;
  onPress?: () => void;
}

export const SettingsButton = ({ type, title, icon, onPress }: IProps) => {
  const [languageOptionsOpened, setLanguageOptionsOpened] = useState(false);
  const { language, t } = i18n;
  const [activeLanguage, setActiveLanguage] = useState(language);

  useEffect(() => {
    i18n.changeLanguage('uk');
  }, [activeLanguage]);

  return type === 'chooseLanguage' ? (
    <View style={styles.wrapper}>
      <Pressable
        onPress={() => setLanguageOptionsOpened(!languageOptionsOpened)}
      >
        <SFlex justifyContent={'space-between'}>
          <SFlex gap={12}>
            {icon}
            <SText color={Colors.White} type={'b1Medium'}>
              {title}
            </SText>
          </SFlex>
          <ArrowIcon transform={'rotate(180)'} />
        </SFlex>
      </Pressable>
      {languageOptionsOpened && (
        <View style={styles.languageOptionsWrapper}>
          <SButton
            styleBtn={
              activeLanguage === 'en' ? styles.buttonActive : styles.button
            }
            onPress={() => setActiveLanguage('en')}
          >
            <SText color={Colors.White} type={'b1Medium'}>
              {t('screens.setting.en')}
            </SText>
            {activeLanguage === 'en' && <ChechIcon />}
          </SButton>
          <SButton
            styleBtn={
              activeLanguage === 'ru' ? styles.buttonActive : styles.button
            }
            onPress={() => setActiveLanguage('ru')}
          >
            <SText color={Colors.White} type={'b1Medium'}>
              {t('screens.setting.ru')}
            </SText>
            {activeLanguage === 'ru' && <ChechIcon />}
          </SButton>
        </View>
      )}
    </View>
  ) : (
    <SButton styleBtn={styles.wrapper} onPress={onPress || (() => {})}>
      <SFlex gap={12}>
        {icon}
        <SText
          color={type === 'accent' ? Colors.Red : Colors.White}
          type={'b1Medium'}
        >
          {title}
        </SText>
      </SFlex>
    </SButton>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFFFFF14',
    borderColor: Colors.LighterGray,
    borderWidth: 1,
    borderRadius: 24,
    padding: 18,
  },
  button: {
    backgroundColor: '#FFFFFF14',
    borderColor: Colors.LighterGray,
    borderWidth: 1,
    borderRadius: 16,
    padding: 13,
  },
  buttonActive: {
    backgroundColor: '#ffffff40',
    borderRadius: 16,
    padding: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageOptionsWrapper: {
    marginTop: 8,
    gap: 8,
  },
});
