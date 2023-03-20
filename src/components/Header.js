import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'


const Header = () => {
  return (
    <View style={styles.contenedor}>
        <Text style={styles.texto}>Planificador de</Text>
        <Text style={styles.textoBold}> Gastos</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  texto:{
    textAlign: 'center',
    fontSize: 30,
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: '600',
    paddingTop: 20,
  },
  textoBold:{
    textAlign: 'center',
    fontSize: 30,
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: '700',
    paddingTop: 1,
  }
})
export default Header