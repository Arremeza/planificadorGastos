import React, { useState, useEffect } from 'react'
import {
    Text,
    SafeAreaView,
    View,
    TextInput,
    StyleSheet,
    Pressable
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import globalStyles from '../styles/style'


const FormularioGastos = ({ 
    setModal, 
    handleGasto, 
    setGasto, 
    gasto,
    eliminarGasto 
}) => {

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [ id, setId ] = useState('')
    const [fecha, setFecha] = useState('')

    useEffect(() => {
      if(gasto?.nombre){
        setNombre(gasto.nombre)
        setCantidad(gasto.cantidad)
        setCategoria(gasto.categoria)
        setId(gasto.id)
        setFecha(gasto.fecha)
      }
    }, [gasto])

    return (
        <SafeAreaView style={styles.contenedor}>
            <View style={styles.contenedorBotones}>
                <Pressable
                    onPress={() => {
                        setModal(false)
                        setGasto({})
                    }}
                    style={[styles.btn, styles.btnCancelar]}
                >
                    <Text style={styles.btnTexto}>Cancelar</Text>
                </Pressable>

                { !!id && (
                    <Pressable
                    style={[styles.btn, styles.btnEliminar]}
                    onPress={() => eliminarGasto(id)}
                >
                    <Text style={styles.btnTexto}>Eliminar</Text>
                </Pressable>
                )}
                
            </View>

            <View style={styles.formulario}>
                <Text style={styles.titulo}>
                    {gasto?.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}
                </Text>

                <View style={styles.campo}>
                    <Text style={styles.label}>Nombre Gasto</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Nuevo gasto'
                        value={nombre}
                        onChangeText={setNombre}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Cantidad Gasto</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Cantidad Gasto'
                        keyboardType='numeric'
                        value={cantidad}
                        onChangeText={setCantidad}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Categoria Gasto</Text>
                    <Picker
                        style={styles.input}
                        selectedValue={categoria}
                        onValueChange={(v) => {
                            setCategoria(v)
                        }}
                    >
                        <Picker.Item label='-- Seleccionar --' value='' />
                        <Picker.Item label='Ahorro' value='ahorro' />
                        <Picker.Item label='Comida' value='comida' />
                        <Picker.Item label='Casa' value='casa' />
                        <Picker.Item label='Gastos Varios' value='gastos' />
                        <Picker.Item label='Ocio' value='ocio' />
                        <Picker.Item label='Salud' value='salud' />
                        <Picker.Item label='Suscripciones' value='suscripciones' />
                    </Picker>
                </View>

                <Pressable
                    style={styles.submitBtn}
                    onPress={() => handleGasto({ nombre, cantidad, categoria, id, fecha })}
                >
                    <Text style={styles.submitBtnTexto}>
                    {gasto?.nombre ? 'Guardar Cambios' : 'Agregar Gasto'}</Text>
                </Pressable>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#1e40af',
        flex: 1,
    },
    contenedorBotones: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },  
    btn: {
        padding: 10,
        marginTop: 30,
        marginHorizontal: 10,
        borderRadius: 5,
        flex: 1,
    },
    btnCancelar: {
        backgroundColor: '#bd2777',
        
    },
    btnEliminar: {
        backgroundColor: 'red'
    },
    btnTexto: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#fff'
    },
    formulario: {
        ...globalStyles.contenedor
    },
    titulo: {
        textAlign: 'center',
        fontSize: 28,
        marginBottom: 30,
        color: '#64748b',
    },
    campo: {
        marginVertical: 10,
    },
    label: {
        color: '#64748b',
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    submitBtn: {
        backgroundColor: '#3b82f6',
        padding: 10,
        marginTop: 20,
        borderRadius: 2,
    },
    submitBtnTexto: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
})

export default FormularioGastos