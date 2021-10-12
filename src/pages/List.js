import React, {useState, useEffect} from "react";
import {io} from "socket.io-client";
import {Alert, SafeAreaView, ScrollView, Image, AsyncStorage, StyleSheet } from "react-native";

import SpotList from "../components/SpotList";
import { url } from "../services/api";

import logo from '../assets/logo.png';

export default function List(){
    const [techs, setTechs] = useState([]);

    useEffect(()=> {
        AsyncStorage.getItem('user').then(user_id=>{
            const socket = io(`http://${url}:3333`,{
                query: {user_id}
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
            })
        })
    }, [])

    useEffect(()=>{
        AsyncStorage.getItem('techs').then(storageTechs => {
            const techsArray = storageTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, []);
    return(
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo}/>
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech}/>)}
               
            </ScrollView>
           
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,

    },
    logo:{
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 50,
    }
})