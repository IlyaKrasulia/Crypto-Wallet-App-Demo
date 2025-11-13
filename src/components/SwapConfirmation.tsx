import React, { useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  State,
} from 'react-native-gesture-handler';
import { Colors, screenWidth } from 'utils/styles';
import ArrowRightIcon from '@assets/icons/arrow-down.svg';
import TradeIcon from '@assets/icons/trade.svg';
import i18n from 'utils/i18n.config';
import { BlurView } from '@react-native-community/blur';
import { SFlex } from './Styled/SFlex';
import { SText } from './Styled/SText';

interface IProps {
  rate: string;
  time: string;
  swapDetails: string;
  onSwipeComplete: () => void;
  isValid: boolean;
}

export const SwapConfirmation = ({
  rate,
  time,
  swapDetails,
  onSwipeComplete,
  isValid,
}: IProps) => {
  const { t } = i18n;
  const translateX = useRef(new Animated.Value(0)).current;

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: false },
  );

  const onHandlerStateChange = ({
    nativeEvent,
  }: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationX > screenWidth * 0.76) {
        onSwipeComplete();
        return;
      }

      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const buttonStyle = {
    transform: [
      {
        translateX: translateX.interpolate({
          inputRange: [0, screenWidth * 0.76],
          outputRange: [0, screenWidth * 0.76],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const backgroundStyle = {
    width: translateX.interpolate({
      inputRange: [0, screenWidth * 0.76],
      outputRange: [56, screenWidth * 0.76 + 56],
      extrapolate: 'clamp',
    }),
  };

  return (
    <View style={styles.wrapper}>
      <BlurView
        style={StyleSheet.absoluteFillObject}
        blurType={'ultraThinMaterialDark'}
      />
      <SFlex justifyContent={'space-between'} marginBottom={12}>
        <SText type={'s2'} color={Colors.White}>
          {t('screens.swapCrypto.rate')}
        </SText>
        <SText type={'b1'} color={Colors.White}>
          {rate}
        </SText>
      </SFlex>
      <SFlex justifyContent={'space-between'} marginBottom={12}>
        <SText type={'s2'} color={Colors.White}>
          {t('screens.swapCrypto.time')}
        </SText>
        <SText type={'b1'} color={Colors.White}>
          {time}
        </SText>
      </SFlex>
      <SFlex justifyContent={'space-between'} marginBottom={16}>
        <SText type={'s2'} color={Colors.White}>
          {t('screens.swapCrypto.title')}
        </SText>
        <SText type={'b1'} color={Colors.White}>
          {swapDetails}
        </SText>
      </SFlex>
      <View
        style={[
          styles.buttonWrapper,
          !isValid ? styles.notValid : styles.valid,
        ]}
      >
        <Animated.View style={[styles.background, backgroundStyle]} />
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Animated.View style={[styles.button, buttonStyle]}>
            <TradeIcon />
          </Animated.View>
        </PanGestureHandler>
        <SText type={'s1'} color={Colors.White}>
          {t('screens.swapCrypto.swap')}
        </SText>
        <SFlex>
          <ArrowRightIcon
            transform={'rotate(-90)'}
            height={30}
            width={30}
            style={styles.inputIcon}
            opacity={0.5}
          />
          <ArrowRightIcon transform={'rotate(-90)'} height={30} width={30} />
        </SFlex>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderColor: Colors.LighterGray,
    borderWidth: 1,
    borderRadius: 24,
    borderBottomStartRadius: 0,
    borderBottomRightRadius: 0,
    padding: 16,
    paddingBottom: 24,
    overflow: 'hidden',
  },
  buttonWrapper: {
    borderColor: Colors.LighterGray,
    backgroundColor: Colors.InputBg,
    borderWidth: 1,
    borderRadius: 50,
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  button: {
    backgroundColor: Colors.Primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: 56,
    height: 56,
    borderRadius: 50,
    zIndex: 2,
  },
  background: {
    position: 'absolute',
    height: '100%',
    backgroundColor: Colors.Primary,
    zIndex: 1,
    borderRadius: 50,
    left: 4,
  },
  inputIcon: {
    left: 15,
  },
  valid: { opacity: 1 },
  notValid: { opacity: 0.5 },
});
