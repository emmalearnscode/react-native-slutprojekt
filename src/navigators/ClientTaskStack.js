import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ClientSingleTask from "../screens/client/ClientSingleTask";
import ClientTasks from "../screens/client/ClientTasks";
import SingleUser from "../screens/shared/SingleUser";
import Color from "../constants/color";
import { TasksContextProvider } from "../store/WorkerTasksContext";

const Stack = createStackNavigator();

const ClientTaskStack = () => {
  return (
    <TasksContextProvider>
      <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: Color.grey } }}
        initialRouteName="ClientTasks"
      >
        <Stack.Screen
          name="ClientTasks"
          component={ClientTasks}
          options={{ title: "My Tasks" }}
        />
        <Stack.Screen name="ClientSingleTask" component={ClientSingleTask} />
        <Stack.Screen name="SingleUser" component={SingleUser} />
      </Stack.Navigator>
    </TasksContextProvider>
  );
};

export default ClientTaskStack;
