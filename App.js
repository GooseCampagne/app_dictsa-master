import { StyleSheet, Text, View, StatusBar, StatusBarStyle } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/AdminScreen/HomeScreen';
import AvancesScreen from './Screens/AdminScreen/AvancesScreen';
import LoginScreen from './Screens/Login/LoginScreen';
import ResidenteScreen from './Screens/ResidenteScreen/ResidenteScreen';
import ResidenteAvances from './Screens/ResidenteScreen/ResidenteAvances';
import NewObra from './Screens/AdminScreen/NewObra';
import RhScreen from './Screens/RhScreen/RhScreen';
import ProfileScreen from './Screens/profile/ProfileScreen';
import AddUsers from './Screens/RhScreen/AddUsers';
import Users from './Screens/RhScreen/Users';
import Incidencias from './Screens/RhScreen/Incidencias';
import EditUser from './Screens/RhScreen/EditUser';
import AddIncidencia from './Screens/RhScreen/AddIncidencia';
import Asistencias from './Screens/RhScreen/Asistencias';
import IncidenciasAdmin from './Screens/AdminScreen/IncidenciasAdmin';
import imagenprueba from './Screens/ResidenteScreen/imagenprueba';
import ChangePassword from './Screens/profile/ChangePassword';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Stack.Navigator>
      <Stack.Screen  name="Login" component={LoginScreen}  options={{ title: 'Login', headerShown: false, }} />
      <Stack.Screen  name="Residente" component={ResidenteScreen}  options={{ title: 'DiCTSA Movil', headerShown: true, }} />
      <Stack.Screen  name="Home" component={HomeScreen}  options={{ title: 'Admin', headerShown: false, gestureEnabled: true }} />
      <Stack.Screen  name="Avances" component={AvancesScreen}  options={{ title: 'Avances', headerShown: false, }} />
      <Stack.Screen  name="ResidenteAvances" component={ResidenteAvances}  options={{ title: 'DiCTSA Movil', headerShown: true,}} />
      <Stack.Screen  name="NewObra" component={NewObra}  options={{ title: 'DiCTSA Movil', headerShown: true,}} />
      <Stack.Screen  name="rh" component={RhScreen}  options={{ title: 'Recursos Humanos', headerShown: true,}} />
      <Stack.Screen  name="addusers" component={AddUsers}  options={{ title: 'editar', headerShown: true,}} />
      <Stack.Screen  name="users" component={Users}  options={{ title: 'Usuarios', headerShown: true,}} />
      <Stack.Screen  name="incidencias" component={Incidencias}  options={{ title: 'Usuarios', headerShown: true,}} />
      <Stack.Screen  name="editUser" component={EditUser}  options={{ title: 'Usuarios', headerShown: false,}} />
      <Stack.Screen  name="addincidencias" component={AddIncidencia}  options={{ title: 'Incidencias', headerShown: true,}} />
      <Stack.Screen  name="asistencias" component={Asistencias}  options={{ title: 'Usuarios', headerShown: true,}} />
      <Stack.Screen  name="imagenprueba" component={imagenprueba}  options={{ title: 'Usuarios', headerShown: true,}} />
      <Stack.Screen  name="profile" component={ProfileScreen}  options={{ title: 'Usuarios', headerShown: true,}} />
      <Stack.Screen  name="passwordReset" component={ChangePassword}  options={{ title: 'Usuarios', headerShown: true,}} />
      </Stack.Navigator>
    </NavigationContainer>
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
