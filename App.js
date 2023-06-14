import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';

import Button from './assets/components/Button';
import ImageViewer from './assets/components/ImageViewer';
import CircleButton from './assets/components/Circle';
import IconButton from './assets/components/IconButton';

import * as ImagePicker from 'expo-image-picker';
import EmojiPicker from './assets/components/EmojiPicker';
import EmojiList from './assets/components/EmjioList';
import EmojiSticker from './assets/components/EmjioSticker';


const PlaceholderImage = require("./assets/images/background-image.png");


export default function App() {

  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImageAsync = async () => {
    setIsModalVisible(false);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };



  
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage}  SelectedImage={selectedImage} />
        {pickedEmoji !== null ? <EmojiSticker imageSize={40} stickerSource={pickedEmoji} /> : null}
      </View>
      {showAppOptions ? (
         <View style={styles.optionsContainer}>
         <View style={styles.optionsRow}>
           <IconButton icon="refresh" label="Reset" onPress={onReset} />
           <CircleButton onPress={onAddSticker} />
           <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
         </View>
       </View>
      ) : (
      <View style={styles.footerContainer}>
        <Button label="Choose a photo" theme="primary" onPress={pickImageAsync} />
        <Button label="Use this photo"  onPress={() => setShowAppOptions(true)}/>
      </View>
      )}
        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose} >
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="auto" />
    </View>
      
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  }
});
