import {TouchableOpacity, StyleSheet, View, Alert, Image} from "react-native";
import {useEffect, useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import {useAuth, UserData} from "@/providers/AuthProvider";

let API_URL = process.env.EXPO_PUBLIC_API_URL;

const styles = StyleSheet.create({
  captureBtn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'lightgrey'
  },
});

type AvatarProps = {
  onUploading: (uploading: boolean) => void;
};

export const Avatar = ({onUploading}: AvatarProps) => {
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const [avatar, setAvatar] = useState<string>();
  const [user, setUser] = useState<UserData>();
  const {getUserData, token} = useAuth();

  const uploadImage = async (uri: string) => {
    try {
      onUploading(true);
      const result = await FileSystem.uploadAsync(`${API_URL}/auth/${user?.id}/upload`, uri, {
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'image',
        headers: {
          Authorization: `Bearer ${token!}`,
        },
      });

      if(result.status !== 200) {
        throw new Error('Upload failed');
      }

      if(result) {
        const json = JSON.parse(result.body);
        const updated = `${json.user[0].avatar}?hash=${new Date().getTime()}`;
        setShowPlaceholder(false);
        setAvatar(updated);
      }
    } catch (error) {
      Alert.alert('Upload failed', 'Please try again later');
    } finally {
      onUploading(false);
    }
  };

  const checkCameraPermissions = async () => {
    try {
      const { status } = await ImagePicker.getCameraPermissionsAsync();

      if (status !== 'granted') {
        await ImagePicker.requestCameraPermissionsAsync();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const selectImage = async (useLibrary: boolean) => {
    let result: {
      cancelled?: boolean;
      assets: { uri: string }[] | null;
    };

    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75,
    };

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await checkCameraPermissions();
      result = await ImagePicker.launchCameraAsync(options);
    }

    if (!Object.is(result.assets, null) && !result.cancelled) {
      uploadImage((result?.assets as { uri: string }[])[0].uri);
    }
  };

  const onNoAvatar = () => {
    setShowPlaceholder(true);
  };

  useEffect(() => {
    setUser(getUserData!());
    const avatarUrl = `${API_URL}/uploads/${user?.id}/avatar.png`;
    setAvatar(avatarUrl);
  }, []);

  return (
   <TouchableOpacity onPress={() => selectImage(true)} style={styles.captureBtn}>
     {showPlaceholder ? (
      <View style={styles.avatar} />
     ) : (
      <Image
       source={{ uri: avatar || require('@/assets/images/emptyAvatar.webp') }}
       style={styles.avatar}
       onError={onNoAvatar}
      />
     )};
   </TouchableOpacity>
  );
};
