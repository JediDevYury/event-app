import {
  Image,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {BlurView} from 'expo-blur';
import {useState} from 'react';
import {defaultStyles} from '@/constants/Styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createEvent, uploadEventImage} from '@/utils/events';
import {useRouter} from 'expo-router';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import {Loader} from "@/components/Loader";

const Page = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);

  const createMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: async (data) => {
      if (image && data.event[0]) {
        const event = data.event[0];
        await uploadEventImage!(image, event.id!);
      }
      setLoading(false);

      queryClient.invalidateQueries({queryKey: ['events']});
      Toast.show({
        type: 'success',
        text1: 'Event created! 🎉',
        text2: 'Enjoy your new event with friends!'
      });
      router.dismiss(1);
    }
  });

  const onChange = (event: any, selectedDate: any) => {
    setDate(selectedDate);
  };

  const onCreateEvent = () => {
    setLoading(true);
    createMutation.mutate({
      title,
      description,
      start: date.toISOString()
    });
  };

  const selectImage = async (useLibrary: boolean) => {
    let result;
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75
    };

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync(options);
    }

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
   <BlurView
    intensity={80}
    tint={'dark'}
    style={{flex: 1, paddingTop: 100, backgroundColor: 'rgba(0,0,0,0.5)'}}
   >
     <View style={styles.container}>
       <Loader loading={loading} />

       <TouchableOpacity onPress={() => selectImage(true)} style={{marginBottom: 10}}>
         {!image ? (
          <View style={styles.placeholder}>
            <Text style={{color: '#fff'}}>Select image</Text>
          </View>
         ) : (
          <Image source={{uri: image}} style={styles.image} />
         )}
       </TouchableOpacity>

       <TextInput
        placeholder="Event Title"
        value={title}
        onChangeText={setTitle}
        style={defaultStyles.inputField}
       />

       <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={[defaultStyles.inputField, {height: 100}]}
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
       />

       <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 10
        }}
       >
         <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>Start</Text>
         <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'datetime'}
          onChange={onChange}
          display="default"
          themeVariant={'dark'}
         />
       </View>

       <TouchableOpacity
        style={defaultStyles.button}
        onPress={onCreateEvent}
        disabled={title === '' || description === ''}
       >
         <Text style={defaultStyles.buttonText}>Create Event</Text>
       </TouchableOpacity>
     </View>
   </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  placeholder: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover'
  }
});
export default Page;
