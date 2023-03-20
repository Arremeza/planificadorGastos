import React from 'react'
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native'
import globalStyles from '../styles/style'

const NuevoPresupuesto = ( { 
    handleNuevoPresupuesto,
    presupuesto,
    setPresupuesto 
} ) => {

    return (
        <View style={styles.contenedor}>
            <Text style={styles.label}>Definir Prespuesto</Text>

            <TextInput 
                keyboardType='numeric'
                placeholder='Agrega tu presupuesto'
                style={styles.input}
                value={presupuesto.toString()}
                onChangeText={setPresupuesto}
            />

            <Pressable 
                onPress={() => handleNuevoPresupuesto(presupuesto)}
                style={styles.boton}>
                <Text style={styles.botonTexto}>Agregar Presupuesto</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor:{
        ...globalStyles.contenedor
    },
    label: {
        textAlign: 'center',
        fontSize: 24,
        color: '#3b82f6',
    },
    input: {
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 10,
        textAlign: 'center',
        marginTop: 30,  
    },
    boton: {
        marginTop: 30,
        backgroundColor: '#1048a4',
        padding: 10,
        borderRadius: 10
    },
    botonTexto: {
        color: '#fff',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
})

export default NuevoPresupuesto