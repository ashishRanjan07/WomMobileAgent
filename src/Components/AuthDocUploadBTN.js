import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import DocumentPicker, {isInProgress} from 'react-native-document-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Colors from '../Assets/Colors';
import {FontSize} from '../Assets/Fonts';
import {responsiveFontSize, responsivePadding} from '../Component/Responsive';

export default function AuthDocUploadBTN({filePath, selectedFlePath, title}) {
  const SelectFileBTN = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });
      selectedFlePath(pickerResult);
    } catch (e) {
      handleError(e);
    }
  };

  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  return (
    <View style={styles.container}>
      {filePath ? (
        <View style={styles.docViewContainer}>
          <View style={styles.docViewContainerOne}>
            <Ionicons name="checkmark-circle-outline" size={responsiveFontSize(30)} color={Colors.green} />
            <Text style={styles.uploadBTNText}>{filePath.name}</Text>
          </View>
          <Pressable onPress={() => selectedFlePath(null)}>
            <AntDesign name="delete" size={25} color="red" />
          </Pressable>
        </View>
      ) : (
        <TouchableOpacity onPress={() => SelectFileBTN()} style={styles.touch}>
          <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: responsivePadding(10),
  },
  docViewContainer: {
    marginHorizontal:responsivePadding(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  docViewContainerOne: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  uploadBTNText: {
    color: Colors.black,
    fontSize: FontSize.fontSize16,
    padding: responsivePadding(10),
    textAlign: 'justify',
  },
  touch: {
    padding: responsivePadding(10),
    alignItems: 'center',
  },
  buttonText: {
    fontSize: responsiveFontSize(18),
    color: Colors.blue,
    fontWeight: '500',
  },
});
