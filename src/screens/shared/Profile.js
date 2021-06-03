import React, {useContext} from "react";
import { SafeAreaView, Text, Button } from 'react-native'
import AuthContext from "../../store/AuthContext";
import BaseContainer from "../../components/BaseComponents/BaseContainer"

const ProfileScreen = () => {
  const { signOut, user } = useContext(AuthContext);
  return (
    <BaseContainer>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Button
        onPress={() => {
          signOut();
        }}
        title="sign out"
      />
    </BaseContainer>
  );
};

export default ProfileScreen;
