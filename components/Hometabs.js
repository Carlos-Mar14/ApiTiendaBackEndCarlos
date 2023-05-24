import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Listcustomers from './Listcustomers';
import CustomerScreen from './CustomerScreen.js';
import {MaterialIcons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Hometabs() {
    return (
        <Tab.Navigator
        screenOptions={{
            headerShown:false,
            tabBarActiveBackgroundColor:'orange'
        }}
        >
            <Tab.Screen name="Customer" component={CustomerScreen} options={{
                title:"Cliente",
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="person" color="blue" size={26} />
                  )
            }}/>
            <Tab.Screen name="List" component={Listcustomers} options={{
                title:"Listar Clientes",
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="view-list" color="blue" size={26} />
                  )
            }}/>
        </Tab.Navigator>
    )
}
