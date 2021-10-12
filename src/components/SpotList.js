import React, { useEffect, useState } from "react";
import { withNavigation } from "react-navigation";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
} from "react-native";

import api from "../services/api";
import { url } from "../services/api";

function SpotList({ tech, navigation }) {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const response = await api.get("/spots", {
        params: { tech },
      });
      setSpots(response.data);
    }

    loadSpots();
  }, []);

  function handleNavigate(id){
      navigation.navigate('Book', {id});
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Empresas que usam <Text style={styles.bold}>{tech}</Text>{" "}
      </Text>

      <FlatList
        style={styles.list}
        data={spots}
        keyExtractor={(spot) => spot._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const itemThumbnailUrl = item.thumbnail_url.replace(
            "localhost",
            url
          );
          
          return (
            <View style={styles.listItem}>
              <Image style={styles.thumbnail} source={{ uri: itemThumbnailUrl }} />
              <Text style={styles.company}>{item.company}</Text>
              <Text style={styles.price}>
                {item.price ? `R${item.price}/dia` : "GRATUITO"}
              </Text>
              <TouchableOpacity onPress={()=> handleNavigate(item._id)} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar reserva</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    color: "#444",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  bold: {
    fontWeight: "bold",
  },
  list: {
    paddingHorizontal: 20,
  },
  listItem: {
    marginRight: 15,
  },
  thumbnail: {
    width: 200,
    height: 120,
    resizeMode: "cover",
    borderRadius: 2,
    backgroundColor: "red",
  },
  company:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  price:{
    fontSize: 15,
    color: '#999',
    marginTop: 5,
  },
  button:{
    height: 32,
    backgroundColor: '#f05a5b',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    marginTop: 15, 
},

buttonText:{
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
}
});


export default withNavigation(SpotList);