import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import Imageshow from "./Components/Imageshow";
import SplashScreen from "./Components/Splashscreen";

export default function App() {
  const [albums, setAlbums] = useState([]);
  const [images, setImages] = useState([]);
  const [imageShowComponentActive, setImageShowComponentActive] =
    useState(false);
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    const openFolderPicker = async () => {
      try {
        const { granted } = await MediaLibrary.getPermissionsAsync();
        if (!granted) {
          const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted") {
            alert("Permission to access media library required");
            return;
          }
        }

        const albums = await MediaLibrary.getAlbumsAsync();
        setAlbums(albums);
      } catch (error) {
        console.log("Error fetching albums:", error);
        alert("Error fetching albums. Please try again later.");
      }
    };

    openFolderPicker();
  }, []);

  useEffect(() => {
    const initializeApp = async () => {
      // Simulate app initialization (replace with your actual logic)
      await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust the delay as needed
      setShowSplashScreen(false);
    };

    initializeApp();
  }, []);

  const openAlbum = async (albumId) => {
    try {
      const assets = await MediaLibrary.getAssetsAsync({ album: albumId });
      setImages(assets.assets);
      setImageShowComponentActive(true);
    } catch (error) {
      console.log("Error fetching images:", error);
      alert("Error fetching images. Please try again later.");
    }
  };

  if (showSplashScreen) {
    return <SplashScreen />;
  }

  return (
    <>
      {!imageShowComponentActive && (
        <View style={styles.container}>
          {albums.length > 0 &&
            albums.map((details, index) => (
              <View key={index} style={styles.folder}>
                <Button
                  title={details.title}
                  onPress={() => openAlbum(details.id)}
                />
              </View>
            ))}
        </View>
      )}

      {imageShowComponentActive && (
        <Imageshow
          images={images}
          goToHomePage={() => {
            setImageShowComponentActive(false);
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: "#fff",
    marginTop: 30,
    padding: 20,
    gap: 20,
  },
  folder: {
    height: 100,
    width: 100,
  },
  albumButton: {
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  messageText: {
    fontSize: 18,
    color: "gray",
    marginTop: 20,
  },
});
