import React, { useState } from 'react';
import { Modal, View,  StyleSheet, Image, FlatList, TouchableOpacity,Text } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import ImageViewerHeader from './ImageViewerHeader';

export default function Imageshow({ images, goToHomePage }) {

  const [initialIndex, setInitialIndex] = useState(0)
  // console.log("initialIndex state value is", initialIndex);
console.log("images are", images)
  images = images.map((obj)=>{
    return {
      url: obj.uri,
      fileName: obj.filename
    }
  })
 
  return (
    <Modal 
    visible={true} 
    transparent={true} 
    style={{ flex:1}}
    onRequestClose={()=>{
      goToHomePage();
    }}
    >
      {(images.length == 0) ? <View
      style={styles.container}
    >
      <Text>No Image Found...!</Text>
    </View> :<>
      <ImageViewer 
      index={initialIndex}
      imageUrls={images} 
      style={{flex:8}}
      onChange={(index) => setInitialIndex(index)}
      renderHeader={(index)=> { return  <ImageViewerHeader imageName={images[index]?.fileName} goToHomePage={goToHomePage}/>}}
      />
      <View style={styles.flatListContainer}>
        <FlatList
           data={images}
           renderItem={({ item, index }) => (
             <TouchableOpacity 
             onPress={() => {
              console.log("index is", index);
              setInitialIndex(index)
            }}
             >
               <Image
                 source={{ uri: item.url }}
                 style={styles.flatListImage}
               />
             </TouchableOpacity>
           )}
           keyExtractor={(item, index) => index.toString()}
           horizontal
         />
       </View></>}

    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  mainView: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  flatListContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  flatListImage: {
    width: 100,
    height: '100%',
    margin: 5,
    borderRadius: 10,
  },
});
