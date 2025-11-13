import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal as BottomSheet,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import React, {
  ReactElement,
  memo,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { SText } from 'components/Styled/SText';
import { Colors } from 'utils/styles';
import { BlurView } from '@react-native-community/blur';

interface Props {
  snapPoints?: Array<string | number>;
  isShown: boolean;
  onClose(): void;
  content: ReactElement;
  enableContentGesture?: boolean;
  title?: string;
}

export const BottomSheetModal = memo(
  ({
    snapPoints,
    isShown,
    content,
    enableContentGesture = true,
    title,
    onClose,
  }: Props): ReactElement => {
    const bottomSheetModalRef = useRef<BottomSheet>(null);
    const position = useSharedValue(0);

    const handleChangePosition = useCallback(
      (index: number) => {
        if (index === -1) {
          onClose();
        }
      },
      [onClose],
    );

    const renderBackdrop = useCallback(
      ({ style, ...props }: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          style={[style, styles.backdrop]}
          animatedPosition={position}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={1}
        >
          <BlurView
            style={[StyleSheet.absoluteFill, styles.blur]}
            blurType={'ultraThinMaterialDark'}
            blurAmount={8}
            reducedTransparencyFallbackColor={'black'}
          />
        </BottomSheetBackdrop>
      ),
      [position],
    );

    useEffect(() => {
      if (isShown) {
        bottomSheetModalRef.current?.present();
      } else {
        bottomSheetModalRef.current?.dismiss();
      }
    }, [isShown]);

    useFocusEffect(
      useCallback(
        () => () => {
          bottomSheetModalRef.current?.dismiss();
        },
        [],
      ),
    );

    return (
      <BottomSheet
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        index={snapPoints ? 1 : undefined}
        animatedPosition={position}
        enableDynamicSizing={true}
        enablePanDownToClose={true}
        enableContentPanningGesture={enableContentGesture}
        enableOverDrag={false}
        onChange={handleChangePosition}
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.backgroundStyle}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <BottomSheetView style={styles.content}>
          {title ? (
            <View style={styles.header}>
              <SText color={Colors.White} type={'b1Bold'}>
                {title}
              </SText>
            </View>
          ) : null}
          {content}
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },

  backdrop: { backgroundColor: Colors.transparent },

  blur: {},

  content: {},

  backgroundStyle: {
    backgroundColor: Colors.White,
    opacity: 0.1,
  },

  handleIndicator: {
    backgroundColor: Colors.White,
  },
});
