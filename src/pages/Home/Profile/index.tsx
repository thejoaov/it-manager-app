import React from "react";
import { Button, Text } from "react-native-paper";
import { useAuthContext } from "@contexts/auth";
import Flexbox from "@components/atoms/Flexbox";
import { AppStackScreenProps } from "@routes/types";

const Profile: React.FC<AppStackScreenProps<"Profile">> = () => {
  const { user, requestLogout } = useAuthContext();

  return (
    <Flexbox p={20} testID="profile">
      <Text variant="bodyMedium">Profile</Text>
      <Button mode="contained-tonal" onPress={requestLogout}>
        <Text>Logout</Text>
      </Button>
    </Flexbox>
  );
};

export default Profile;
