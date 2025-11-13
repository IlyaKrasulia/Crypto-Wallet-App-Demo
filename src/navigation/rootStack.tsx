import React, { useCallback } from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { Onboarding } from 'screens/onboarding';
import { SignIn } from 'screens/signIn';
import { CheckingSecrets, CreateSecrets } from 'screens/signUp';
import { Coin } from 'screens/coin';
import { Transactions } from 'screens/transactions';
import { SelectCoin } from 'screens/selectCoin';
import { Wallets } from 'screens/wallets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Settings } from 'screens/settings';
import { ReceiveAddress } from 'screens/receiveAddress';
import { Receive } from 'screens/receive';
import { StakingInfo } from 'screens/stakingInfo';
import { StakingOption } from 'screens/stakinkOption';
import { SendCrypto } from 'screens/sendCrypto';
import { Swap } from 'screens/swap';
import { SwapSuccessful } from 'screens/swapSuccessful';
import { DeleteWallet } from 'screens/deleteWallet';
import { SavedSeed } from 'screens/savedSeed';
import { LoadingImport } from 'screens/loadingCreatingWallet';
import { LoadingCreatingWallet } from 'screens/loadingImport';
import { SendCryptoSuccessful } from 'screens/sendCryptoSuccessful';
import { QrScaner } from 'screens/qrScaner';
import i18n from 'utils/i18n.config';
import { stackStyles } from './stackStyles';
import BackImage from './components/BackImage';
import { MainTabs } from './MainTabs';
import MainHeader from './components/MainHeader';

export type RootStackParamList = {
  Onboarding: undefined;
  SignIn: undefined;
  CheckingSecrets: { phrases: string[] };
  LoadingImport: undefined;
  CreateSecrets: undefined;
  LoadingCreatingWallet: undefined;

  Coin: { balance: number; coinTitle: string; coinFullTitle: string };
  SelectCoin: { type: 'send' | 'receive' | 'swap' };

  SendCrypto: { currency: string };
  'SendCrypto/Successful': undefined;

  Wallets: undefined;

  Transactions: undefined;
  AddTransaction: undefined;

  Receive: undefined;
  ReceiveAddress: { currency: string };

  StakingInfo: {
    status: 'Staking' | 'Finished';
    staked: boolean;
    data: { time: string; date: string; currency: string; amount: number }[];
    currency: string;
    start?: string;
    end?: string;
  };
  StakingOption: undefined;

  Swap: undefined;
  'Swap/Successful': undefined;

  Settings: undefined;
  DeleteWallet: undefined;
  SavedSeed: undefined;

  SelectWallet: undefined;

  MainTabs: undefined;

  ScanQr: {
    type: 'sendCrypto' | 'signIn';
  };
};

export type RootStackNavigationProp<
  RouteName extends keyof RootStackParamList,
> = StackNavigationProp<RootStackParamList, RouteName>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  const { t } = i18n;
  const safeAreaInsets = useSafeAreaInsets();

  const renderMainHeader = useCallback(() => <MainHeader />, []);

  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerBackTitleVisible: false,
        headerBackImage: BackImage,
        headerTitleAlign: 'center',
        headerTransparent: true,
        headerBackTitle: '',
        headerStyle: [
          stackStyles.headerStyle,
          {
            height: 64 + safeAreaInsets.top,
          },
        ],
        headerTitleStyle: stackStyles.headerTitleStyle,
      })}
    >
      <Stack.Screen
        name={'Onboarding'}
        component={Onboarding}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'SignIn'}
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'LoadingImport'}
        component={LoadingImport}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'SelectWallet'}
        component={Wallets}
        options={{
          title: t('headerTitles.selectWallet'),
        }}
      />
      <Stack.Screen
        name={'CreateSecrets'}
        component={CreateSecrets}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'CheckingSecrets'}
        component={CheckingSecrets}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'LoadingCreatingWallet'}
        component={LoadingCreatingWallet}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={'Wallets'}
        component={Wallets}
        options={{
          headerTitle: t('headerTitles.selectWallet'),
        }}
      />

      <Stack.Screen
        name={'Coin'}
        component={Coin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'SelectCoin'}
        component={SelectCoin}
        options={{
          headerTitle: 'Select Crypto',
        }}
      />

      <Stack.Screen
        name={'SendCrypto'}
        component={SendCrypto}
        options={({ route }) => ({
          headerTitle: t('headerTitles.sendCrypto', {
            currency: route.params.currency,
          }),
        })}
      />
      <Stack.Screen
        name={'ScanQr'}
        component={QrScaner}
        options={{
          headerTitle: 'Scan QR Code',
        }}
      />

      <Stack.Screen
        name={'SendCrypto/Successful'}
        component={SendCryptoSuccessful}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={'Transactions'}
        component={Transactions}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={'Settings'}
        component={Settings}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={'DeleteWallet'}
        component={DeleteWallet}
        options={{
          title: t('headerTitles.deleteWallet'),
        }}
      />

      <Stack.Screen
        name={'SavedSeed'}
        component={SavedSeed}
        options={{
          title: t('headerTitles.secretPhrase'),
        }}
      />

      <Stack.Screen
        name={'Receive'}
        component={Receive}
        options={{
          title: t('headerTitles.selectCrypto'),
        }}
      />
      <Stack.Screen
        name={'ReceiveAddress'}
        component={ReceiveAddress}
        options={({ route }) => ({
          headerTitle: t('headerTitles.receive', {
            currency: route.params.currency,
          }),
        })}
      />

      <Stack.Screen
        name={'StakingInfo'}
        component={StakingInfo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'StakingOption'}
        component={StakingOption}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={'Swap'}
        component={Swap}
        options={{
          title: t('headerTitles.swap'),
        }}
      />
      <Stack.Screen
        name={'Swap/Successful'}
        component={SwapSuccessful}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={'MainTabs'}
        component={MainTabs}
        options={() => ({
          headerShown: true,
          header: renderMainHeader,
        })}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
