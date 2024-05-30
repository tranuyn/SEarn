import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import scale from "../constant/responsive";
import { Ionicons } from "@expo/vector-icons";
import PlaySongPage from "../pages/PlaySongPage/PlaySong";
import { useNavigation } from "@react-navigation/native";

const SongItem = ({ input }) => {
  const navigation = useNavigation();
  const MoveToPlaySong = () => {
    navigation.navigate("PlaySong", {
      song: input,
    });
  };
  return (
    <TouchableOpacity style={styles.trackContainer} onPress={MoveToPlaySong}>
      {input.album && input.album.image ? (
    <Image source={{ uri: input.album.image }} style={styles.circle} />
  ) : (
    <Image
      source={require("../assets/images/logoSEarn.png")}
      style={styles.circle}
    />
  )}
      <View style={{ flexDirection: "column", flex: 1 }}>
        <Text style={styles.textName} numberOfLines={1} ellipsizeMode="tail">
          {input.name}
        </Text>
        <Text style={styles.textArtist}>
          {input.artists.map((artist) => artist.name).join(", ")}{" "}
        </Text>
      </View>
      <Ionicons name="heart-outline" size={scale(25)} color="#FED215" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  circle: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(60),
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(10),
  },
  textName: {
    fontSize: scale(14),
    color: "white",
    marginRight: scale(10),
  },
  textArtist: {
    fontSize: scale(12),
    color: "white",
    marginRight: scale(10),
  },
  trackContainer: {
    backgroundColor: "#2b2b2b",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scale(12),
    paddingVertical: scale(10),
    paddingHorizontal: scale(10),
    borderRadius: scale(20),
  },
});

export default SongItem;
