import { SFlex } from 'components/Styled/SFlex';
import { SText } from 'components/Styled/SText';
import { SView } from 'components/Styled/SView';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from 'utils/styles';
import i18n from 'utils/i18n.config';
import { BaseInput } from 'components/UI/Inputs/BaseInput';
import { AppBackground } from 'components/Layout/AppBackground';
import { useHeaderHeight } from '@react-navigation/elements';

export const SavedSeed = () => {
  const { t } = i18n;
  const [phrases] = useState(Array(12).fill('test'));

  const headerHeight = useHeaderHeight();

  return (
    <AppBackground>
      <View style={[styles.container, { marginTop: headerHeight + 8 }]}>
        <SView flex={1}>
          <SText color={Colors.White} type={'b1Medium'} marginBottom={50}>
            {t('screens.addSeedPhreses.description')}
          </SText>
          <SFlex flexWrap={'wrap'} justifyContent={'space-between'} gap={10}>
            {phrases.map((phrase, index) => (
              <View key={Math.random()} style={styles.input}>
                <BaseInput
                  defaultValue={phrase}
                  onChangeText={() => {}}
                  rightElem={
                    <SText color={Colors.White} type={'h4'}>
                      {(index + 1).toString()}{t('symbols.dot')}
                    </SText>
                  }
                  rightElemStyle={styles.inputIcon}
                  editable={false}
                />
              </View>
            ))}
          </SFlex>
        </SView>
      </View>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    flex: 1,
  },
  input: {
    width: '45%',
  },
  inputIcon: {
    top: 16,
  },
});
