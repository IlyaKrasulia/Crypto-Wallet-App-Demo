import { AppLayout } from 'components/Layout/AppLayout';
import { SFlex } from 'components/Styled/SFlex';
import { SText } from 'components/Styled/SText';
import { SView } from 'components/Styled/SView';
import React, { FunctionComponent, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Colors, Fonts, screenWidth } from 'utils/styles';
import CameraButton from 'assets/icons/camera.svg';
import { SButton } from 'components/Styled/SButton';
import { CustomButton } from 'components/UI/CustomButton';
import { useNavigation } from '@react-navigation/native';
import i18n from 'utils/i18n.config';
import { Trans } from 'react-i18next';
import { BaseInput } from 'components/UI/Inputs/BaseInput';

// async function getWallet(mnemonic: string[]) {
//   const response = await fetch(
//     'https://gaswallet.ngrok.dev/api/v1/multi_wallet/export',
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({mnemonic}),
//     },
//   );

//   return response.json();
// }

export const SignIn: FunctionComponent = () => {
  const { navigate } = useNavigation();
  const { t } = i18n;
  const [phrases, setPhrases] = useState(Array(12).fill(''));

  const handleInputChange = (text: string, index: number) => {
    setPhrases((prevPhrases) => {
      const updatedPhrases = [...prevPhrases];
      updatedPhrases[index] = text;
      return updatedPhrases;
    });
  };

  // const mutation = useMutation({
  //   mutationFn: () => {
  //     return getWallet(phrases);
  //   },
  //   onSuccess: (data, variables, context) => {
  //     console.log(data, 'OK');
  //     console.log(variables, 'OK');
  //     console.log(context, 'OK');
  //   },
  //   onError: error => {
  //     console.log(error, 'ERROR');
  //   },
  // });

  const handleSubmit = () => {
    navigate('LoadingImport');
  };

  return (
    <AppLayout barStyle={'light-content'}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        pointerEvents={'box-none'}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps={'handled'}
        >
          <SView flex={1}>
            <SFlex alignItems={'center'} justifyContent={'space-between'}>
              <View style={styles.titleWrapper}>
                <SText type={"h2"} color={Colors.White}>
                  <Trans
                    i18nKey={'screens.login.title'}
                    components={{
                      highlight: <Text style={styles.titleMedium} />,
                    }}
                  />
                </SText>
              </View>
              <SButton onPress={() => navigate('ScanQr', {type: 'signIn'})} styleBtn={styles.cameraBtn}>
                <CameraButton />
              </SButton>
            </SFlex>
            <SFlex
              flexWrap={'wrap'}
              justifyContent={'space-between'}
              gap={10}
              flex={1}
              marginTop={20}
              alignItems={'center'}
            >
              {phrases.map((phrase, index) => (
                <View key={Math.random()} style={styles.input}>
                  <BaseInput
                    defaultValue={phrase}
                    onChangeText={(text) => handleInputChange(text, index)}
                    rightElem={
                      <SText type={'h4'} color={Colors.White}>
                        {(index + 1).toString()}
                        {t('symbols.dot')}
                      </SText>
                    }
                    rightElemStyle={styles.inputIcon}
                  />
                </View>
              ))}
            </SFlex>
          </SView>
          <SView marginTop={16} marginBottom={16}>
            <CustomButton
              onPress={handleSubmit}
              text={t('buttons.signIn')}
              background={Colors.White}
              textColor={Colors.Black}
              marginBottom={30}
            />
            <SText
              color={Colors.Gray}
              type={'b1'}
              textAlign={'center'}
              lineHeight={20}
            >
              {t('screens.login.stillMissingOut')}
            </SText>
            <SButton
              onPress={() => navigate('CreateSecrets')}
              marginLeft={16}
              marginTop={8}
            >
              <SText
                type={'b1Medium'}
                color={Colors.White}
                textDecoration={'underline'}
                textAlign={'center'}
                lineHeight={20}
              >
                {t('screens.login.createCryptoWallet')}
              </SText>
            </SButton>
          </SView>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 30,
    flexGrow: 1,
  },
  titleMedium: {
    fontSize: 28,
    lineHeight: 40,
    letterSpacing: -0.02,
    fontFamily: Fonts.satoshiRegular,
  },
  cameraBtn: {
    backgroundColor: Colors.InputBg,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderColor: Colors.LighterGray,
    borderWidth: 1,
  },
  input: {
    width: (screenWidth - 15 * 2 - 10) / 2,
  },
  inputIcon: {
    top: 15,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  titleWrapper: {
    width: screenWidth * 0.8,
  },
});
