import { AppLayout } from 'components/Layout/AppLayout';
import { SFlex } from 'components/Styled/SFlex';
import { SText } from 'components/Styled/SText';
import { SView } from 'components/Styled/SView';
import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from 'utils/styles';
import { Header } from 'components/UI/Header';
import i18n from 'utils/i18n.config';
import { BaseInput } from 'components/UI/Inputs/BaseInput';
import { CustomButton } from 'components/UI/CustomButton';
import { useNavigation } from '@react-navigation/native';

export const CreateSecrets: FunctionComponent = () => {
  const { t } = i18n;
  const [phrases] = useState(Array(12).fill('test'));

  const { navigate } = useNavigation();

  return (
    <AppLayout barStyle={'light-content'}>
      <View style={styles.container}>
        <Header type={'back-big'} title={'Secret phrase'} />
        <SView flex={1} marginTop={20}>
          <SText color={Colors.White} type={'b1Medium'} marginBottom={50}>
            {t('screens.addSeedPhreses.description')}
          </SText>
          <SFlex flexWrap={'wrap'} justifyContent={'space-between'} gap={10} flex={1}>
            {phrases.map((phrase, index) => (
              <View key={Math.random()} style={styles.input}>
                <BaseInput
                  defaultValue={phrase}
                  onChangeText={() => {}}
                  rightElem={
                    <SText color={Colors.White} type={'h4'}>
                      {(index + 1).toString()}
                      {t('symbols.dot')}
                    </SText>
                  }
                  rightElemStyle={styles.inputIcon}
                  editable={false}
                />
              </View>
            ))}
          </SFlex>
          <SView marginTop={16} marginBottom={16}>
            <CustomButton
              onPress={() =>
                navigate('CheckingSecrets', { phrases })
              }
              text={t('buttons.nextStep')}
              background={Colors.White}
              textColor={Colors.Black}
              marginBottom={30}
            />
          </SView>
        </SView>
      </View>
    </AppLayout>
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
