import React, {useCallback} from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Gasto from './Gasto'

const ListadoGastos = ({ gastos, setModal, setGasto, filtro, gastosFiltrados }) => {
        const renderGasto = useCallback(
            (gasto) => (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                setModal={setModal}
                setGasto={setGasto}
              />
            ),
            [setModal, setGasto]
          );
        
          const gastosList = filtro ? gastosFiltrados : gastos;
        
          return (
            <View style={styles.contenedor}>
              <Text style={styles.titulo}>Gastos</Text>
        
              {gastosList.length > 0 ? (
                gastosList.map(renderGasto)
              ) : (
                <Text style={styles.noGastos}>No hay gastos</Text>
              )}
            </View>
          );
}

const styles = StyleSheet.create({
    contenedor: {
        marginTop: 30,
        marginBottom: 100,
    },
    titulo: {
        color: '#64748b',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '700',
        marginTop: 20,
    },
    noGastos: {
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 20,
    }
})

export default ListadoGastos