import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Listcustomers() {
  // Variables de estado del componente
  const [data, setData] = useState([]);
  // Metodo para consumir api de tiendabackend a través de axios
  const getClientes = async () => {
    try{
      const url = `http://127.0.0.1:3000/api/clientes`;
      const response = await axios.get(url);
      setData(response.data)
  
    }
    catch(error){
      console.log(error)
    }
    finally{
      //setLoading(false)
    }
  };

  useEffect(() => {
    getClientes();
  })
  return (
    <View style={styles.container}>
      <Text style={{color:'blue', marginBottom:20,fontWeight:'bold'}}>Listado de Clientes</Text>
      <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item._id} - {item.nombre} - {item.apellidos}</Text>
          )}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
