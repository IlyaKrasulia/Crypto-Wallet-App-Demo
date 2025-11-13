import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/rootStack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import i18n from 'utils/i18n.config';

interface Props {
  route: RouteProp<RootStackParamList, 'ScanQr'>;
}

export const QrScaner = ({ route }: Props) => {
  const { t } = i18n;
  const [_, setPermissionGranted] = useState(false);
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const { params } = route;

  useEffect(() => {
    (async () => {
      const result = await requestPermission();
      setPermissionGranted(result);
      console.log('requestCameratrtrermission: ', result);
    })().catch((err) => {
      console.log('requestCameraPermission Err: ', err);
    });
  }, [requestPermission]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      console.log(`${params.type} ${codes.length} codes!`);
    },
  });

  useEffect(() => {
    console.log('Device: ', hasPermission);
  }, [device, hasPermission]);

  if (!device) return <Text>{t('screens.qrCodeScaner.cameraLoading')}</Text>;

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      codeScanner={codeScanner}
    />
  );
};
