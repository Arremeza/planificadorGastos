import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Pressable,
  Image,
  ScrollView,
  Modal
} from 'react-native';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGastos from './src/components/FormularioGastos';
import { generarId } from './src/helpers';
import ListadoGastos from './src/components/ListadoGastos';
import Filtro from './src/components/Filtro';
import AsyncStorage from '@react-native-async-storage/async-storage';


const App = () => {

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [presupuesto, setPresupuesto] = useState(0)
  const [gastos, setGastos] = useState([])
  const [modal, setModal] = useState(false)
  const [gasto, setGasto] = useState({})
  const [filtro, setFiltro] = useState({})
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect( () => {
    const obtenerPresupuestoStorage = async () => {
      try {
        const presupuestoStorage = await AsyncStorage.getItem('planificador_presupuesto') ?? 0
        console.log(presupuestoStorage)

        if(presupuestoStorage > 0) {
          setPresupuesto(presupuestoStorage)
          setIsValidPresupuesto(true)
        }

      } catch (error) {
        console.log(error)
      }
    }
    obtenerPresupuestoStorage()
  }, [] )

  useEffect (() => {
    if (isValidPresupuesto) {
      const guardarPresupuestoStorage = async () => {
        try {
          await AsyncStorage.setItem('planificador_presupuesto', presupuesto)
        } catch (error) {
          console.log(error)
        }
      }
      guardarPresupuestoStorage()
    }
  }, [ isValidPresupuesto ])

  useEffect( () => {
    const obtenerGastosSotrage = async () => {
      try {
        const gastosStorage = await AsyncStorage.getItem('planificador_gastos')
        setGastos(gastosStorage ? JSON.parse(gastosStorage) : [])
      } catch (error) {
        console.log(error)
      }
    }
    obtenerGastosSotrage()
  }, [] )

  useEffect( () => {
    const guardarGastosStorage = async () => {
      try {
        await AsyncStorage.setItem('planificador_gastos', JSON.stringify(gastos))
      } catch (error) {
        console.log(error)
      }
    }
    guardarGastosStorage()
  }, [ gastos ] )


  const handleNuevoPresupuesto = (presupuesto) => {
    if (Number(presupuesto) > 0) {
      setIsValidPresupuesto(true)
    } else {
      Alert.alert('Error', 'El presupuesto no puede ser menor a 1', [{ text: 'OK' }])
    }
  }

  const handleGasto = (gasto) => {
    if ([gasto.nombre, gasto.categoria, gasto.cantidad].includes('')) {
      Alert.alert(
        'Error',
        'Todos los campos son obligarorios',
      )
      return
    }
    if (gasto.id) {
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
    } else {
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }
    setModal(!modal)
  }

  const eliminarGasto = id => {
    Alert.alert(
      'Deseas eliminar este gasto?',
      'Un gasto eliminado no se puede recuperar',
      [
        { text: 'No', style: 'cancel', },
        {
          text: 'Si, eliminar', onPress: () => {
            const gastosActualizados = gastos.filter(gastoState => gastoState.id !== id)
            setGastos(gastosActualizados)
            setModal(!modal)
            setGasto({})
          }
        }
      ]
    )
  }

  const resetearApp = () => {
    Alert.alert(
      'Deseas reiniciar la app?',
      'Esto eliminará presupuesto y gastos',
      [
        {text: 'NO', style: 'cancel'},
        {text: 'Si, Eliminar', onPress: async () => {
          try {
            await AsyncStorage.clear()

            setIsValidPresupuesto(false)
            setPresupuesto(0)
            setGastos([])
          } catch (error) {
            console.log(error)
          }
        }}
      ]
    )
  }

  return (
    <View style={styles.droidSafeArea}>
      <ScrollView>
        <View style={styles.header}>
          <Header />

          {isValidPresupuesto ?
            (<ControlPresupuesto
              presupuesto={presupuesto}
              gastos={gastos}
              resetearApp={resetearApp}
            />
            ) : (
              <NuevoPresupuesto
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                handleNuevoPresupuesto={handleNuevoPresupuesto}
              />)}

        </View>

        {isValidPresupuesto && (
          <>
            <Filtro
              filtro={filtro}
              setFiltro={setFiltro}
              gastos={gastos}
              setGastosFiltrados={setGastosFiltrados}
            />

            <ListadoGastos
              gastos={gastos}
              setModal={setModal}
              setGasto={setGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </>
        )}
      </ScrollView>
      {modal && (
        <Modal
          animationType='slide'
          visible={modal}
        >
          <FormularioGastos
            modal={modal}
            setModal={setModal}
            handleGasto={handleGasto}
            setGasto={setGasto}
            gasto={gasto}
            eliminarGasto={eliminarGasto}
          />
        </Modal>
      )}
      {isValidPresupuesto && (
        <Pressable
          style={styles.pressable}
          onPress={() => setModal(!modal)}
        >
          <Image
            style={styles.imagen}
            source={require('./src/img/nuevo-gasto.png')}
          />
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  header: {
    backgroundColor: '#3574DD',
    minHeight: 450,
  },
  imagen: {
    width: 60,
    height: 60,
  },
  pressable: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 28,
    right: 24
  },
})

export default App