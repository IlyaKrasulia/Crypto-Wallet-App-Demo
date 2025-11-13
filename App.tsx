import { GestureHandlerRootView } from 'react-native-gesture-handler';

import React, { FunctionComponent } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import RootNavigator from 'navigation';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const queryClient = new QueryClient();

const App: FunctionComponent = () => (
  <SafeAreaProvider>
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <RootNavigator />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  </SafeAreaProvider>
);

export default App;
