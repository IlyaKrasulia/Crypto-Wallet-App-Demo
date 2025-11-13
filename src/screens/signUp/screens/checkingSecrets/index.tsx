import { RouteProp, useNavigation } from '@react-navigation/native';
import { AppLayout } from 'components/Layout/AppLayout';
import { SFlex } from 'components/Styled/SFlex';
import { SText } from 'components/Styled/SText';
import { SView } from 'components/Styled/SView';
import { CustomButton } from 'components/UI/CustomButton';
import { Header } from 'components/UI/Header';
import React, { FunctionComponent, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Colors } from 'utils/styles';
import LockIcon from 'assets/icons/lock.svg';
import i18n from 'utils/i18n.config';
import { useMutation } from '@tanstack/react-query';
import { BlurContainer } from 'components/Styled/BlurContainer';
import { BaseInput } from 'components/UI/Inputs/BaseInput';
import { RootStackParamList } from 'navigation/rootStack';

async function createWallet(mnemonic: string[], name: string) {
  const response = await fetch(
    'https://gaswallet.ngrok.dev/api/v1/multi_wallet/import',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mnemonic, name }),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to create wallet');
  }

  return response.json();
}

interface Props {
  route: RouteProp<RootStackParamList, 'CheckingSecrets'>;
}

export const CheckingSecrets: FunctionComponent<Props> = ({ route }) => {
  const { navigate } = useNavigation();
  const routeParams = route.params;
  const { t } = i18n;
  const [inputs, setInputs] = useState<string[]>(['', '', '', '']);

  const indices = React.useMemo(() => {
    const shuffled = Array.from(routeParams.phrases.keys()).sort(
      () => Math.random() - 0.5,
    );
    return shuffled.slice(0, 4).sort((a, b) => a - b);
  }, [routeParams.phrases]);

  const handleChange = (value: string, index: number) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
  };

  const mutation = useMutation({
    mutationFn: () => createWallet(routeParams.phrases, 'Kras Wallet'),
    onSuccess: (data) => {
      console.log(data, 'OK');
    },
    onError: (error) => {
      console.log(error, 'ERROR');
    },
  });

  const handleConfirm = () => {
    const isCorrect = indices.every(
      (index, i) => routeParams.phrases[index] === inputs[i].trim(),
    );
    if (isCorrect) {
      mutation.mutate();
      // Alert.alert('Success', 'Seed phrases confirmed successfully!');
      navigate('MainTabs');
    } else {
      navigate('MainTabs');
      // Alert.alert('Error', 'Incorrect seed phrases. Please try again.');
    }
  };

  return (
    <AppLayout barStyle={'light-content'}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        pointerEvents={'box-none'}
      >
        <SView paddingLeft={16} paddingRight={16}>
          <Header type={'back'} />
        </SView>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps={'handled'}
        >
          <SView flex={1}>
            <SFlex justifyContent={'center'} alignItems={'center'}>
              <BlurContainer
                radius={100}
                marginBottom={20}
                style={styles.iconWrapper}
              >
                <LockIcon height={47} width={47} />
              </BlurContainer>
            </SFlex>
            <SText color={Colors.White} type={'b2'} marginBottom={25}>
              {t('screens.addSeedPhreses.description')}
            </SText>
            {indices.map((phrase, index) => (
              <BaseInput
                key={Math.random()}
                defaultValue={inputs[index]}
                onChangeText={(text) => handleChange(text, index)}
                rightElem={
                  <SText color={Colors.White} type={'h4'}>
                    {(phrase + 1).toString()}
                    {t('symbols.dot')}
                  </SText>
                }
                rightElemStyle={styles.inputIcon}
                marginBottom={26}
              />
            ))}
          </SView>
          <CustomButton
            onPress={handleConfirm}
            text={t('buttons.nextStep')}
            background={Colors.White}
            textColor={Colors.Black}
            marginBottom={30}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    paddingTop: 16,
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  iconWrapper: {
    width: 105,
    height: 105,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputIcon: {
    top: 15,
  },
});
