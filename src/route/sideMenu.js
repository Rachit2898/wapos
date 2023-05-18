import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import SideMenuDesign from "./SideMenuDesign";
import Route from "./Route";

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Route"
        drawerContent={(props) => <SideMenuDesign {...props} />}
      >
        <Drawer.Screen
          options={{
            headerShown: false,
          }}
          name="Route"
          component={Route}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
