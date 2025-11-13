import { AppLayout } from 'components/Layout/AppLayout';
import { Header } from 'components/UI/Header';
import { SettingsButton } from 'components/UI/SettingsButton';
import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import GlobeIcon from '@assets/icons/globe.svg';
import LockIcon from '@assets/icons/password.svg';
import TrashIcon from '@assets/icons/trash.svg';
import { useNavigation } from '@react-navigation/native';
import { BlurContainer } from 'components/Styled/BlurContainer';

export const Settings: FunctionComponent = () => {
  const { navigate } = useNavigation();

  return (
    <AppLayout>
      <View style={styles.container}>
        <Header type={'back-big'} title={'Settings'} />
        <BlurContainer
          radius={24}
          padding={16}
          marginTop={20}
          style={styles.wrapper}
        >
          <SettingsButton
            type={'chooseLanguage'}
            title={'Language'}
            icon={<GlobeIcon />}
          />
          <SettingsButton
            title={'See secret phrase'}
            icon={<LockIcon />}
            onPress={() => navigate('SavedSeed')}
          />
          <SettingsButton
            type={'accent'}
            title={'Delete wallet'}
            icon={<TrashIcon />}
            onPress={() => navigate('DeleteWallet')}
          />
        </BlurContainer>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  wrapper: {
    gap: 8,
  },
});
