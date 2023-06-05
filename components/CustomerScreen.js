import { View, Text } from 'react-native'
import { useState, useEffect, useRef } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { styles } from '../assets/styles/styles';
import axios from 'axios';


export default function CustomerScreen() {
    const [isError,setIsError]= useState(false);
    const [message, setMessage]= useState('');
    const [idSearch, setIdSearch]= useState('');
    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        defaultValues: {
            firstName: '',
            lastName: ''
        }
    });
    const onSave = async (data) => {
        const response = await axios.post(`http://172.18.61.1:3000/api/clientes`,{
            nombre:data.firstName,
            apellidos:data.lastName
        })
        setIsError(false);
        setMessage("Cliente agregado correctamente..")
        setTimeout(()=>{
            setMessage("")
        },2000)
        reset();
    };

    const onUpdate= async (data) => {
        const response = await axios.put(`http://172.18.61.1:3000/api/clientes/${idSearch}`,{
            nombre:data.firstName,
            apellidos:data.lastName
        })
        setIsError(false);
        setMessage("Cliente actualizado correctamente..")
        setTimeout(()=>{
            setMessage("")
        },2000)
        reset();
        setIdSearch("")
    };

    const onSearch =async()=>{
        const response = await axios.get(`http://172.18.61.1:3000/api/clientes/${idSearch}`)
        if (!response.data.error){
            setValue("firstName", response.data.nombre)
            setValue("lastName", response.data.apellido)
            setMessage("")
        }else{
            setIsError(true);
            setMessage("El id no existe, intentelo de nuevo")
        }
    }

    const onDelete =async(data)=>{
        if (confirm(`Esta seguro de eliminar este cliente: ${data.firstName} ${data.lastName}?`)){
            const response = await axios.delete (`http://172.18.61.1:3000/api/clientes/${idSearch}`)
            setIsError (false)
            setMessage("El cliente se ha eliminado correctamente")
            setTimeout(()=>{
                setMessage("")
            },2000)
            reset();
            setIdSearch("")
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 10 }}
            >Actualización de clientes</Text>
            <TextInput
                label="id del cliente a buscar"
                mode="outlined"
                value={idSearch}
                onChangeText={idSearch=> setIdSearch(idSearch)}
                style={{backgroundColor:'yellow'}}
            />
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Nombre completo"
                        mode="outlined"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="firstName"
            />
            {errors.firstName && <Text style={{ color: 'red' }}>El nombre es obligario.</Text>}

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Apellidos"
                        mode="outlined"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="lastName"
            />
            {errors.lastName && <Text style={{ color: 'red' }}>El apellido es obligario.</Text>}

            <View style={{ flexDirection: 'row' }}>
                <Button
                    icon="content-save"
                    mode="contained"
                    style={{ marginTop: 20 }}
                    onPress={handleSubmit(onSave)}>
                    Guardar
                </Button>
                <Button
                    icon="card-search-outline"
                    mode="contained"
                    style={{ marginTop: 20, backgroundColor:'gray',marginLeft:5 }}
                    onPress={onSearch}>
                    Buscar
                </Button>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Button
                    icon="pencil"
                    mode="contained"
                    style={{ marginTop: 20,backgroundColor:'green' }}
                    onPress={handleSubmit(onUpdate)}>
                    Actualizar
                </Button>
                <Button
                    icon="trash-can-outline"
                    mode="contained"
                    style={{ marginTop: 20, backgroundColor:'red',marginLeft:5 }}
                    onPress={handleSubmit(onDelete)}>
                    Eliminar
                </Button>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{fontWeight:'bold', color: isError ? 'red':'green'}}>
                    {message}</Text>
            </View>
        </View>
    )
}