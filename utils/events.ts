import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { JWT_KEY } from '@/providers/AuthProvider';

const env = process.env.NODE_ENV;
let API_URL = process.env.EXPO_PUBLIC_API_URL;
if (env === 'development' && Platform.OS === 'android') {
  API_URL = 'http://10.0.2.2:3000';
}

export interface EventResponse {
  events: Event[];
}

export interface EventCreateResponse {
  event: Event[];
}

export interface Event {
  id?: string;
  title: string;
  description: string;
  image?: any;
  creatorId?: string;
  start: string;
  user?: User;
}

export interface User {
  name: string;
  avatar?: any;
}

export const createEvent = async (data: Partial<Event>): Promise<EventCreateResponse> => {
  const result = await axios.post(`${API_URL}/events`, data);
  return result.data;
};

export const getEvent = async (id: string): Promise<Event> => {
  const result = await axios.get(`${API_URL}/events/${id}`);
  return result.data.event;
};

export const updateEvent = async (data: Partial<Event>): Promise<EventCreateResponse> => {
  const result = await axios.put(`${API_URL}/events/${data.id}`, data);
  return result.data;
};

export const deleteEvent = async (id: string): Promise<any> => {
  const result = await axios.delete(`${API_URL}/events/${id}`);
  return result.data;
};

export const getEvents = async (upcoming = false): Promise<EventResponse> => {
  const result = await axios.get(`${API_URL}/events${upcoming ? '?upcoming=true' : ''}`);
  return result.data;
};

export const getEventsByUser = async (id: string): Promise<EventResponse> => {
  const result = await axios.get(`${API_URL}/events/users/${id}`);
  return result.data;
};

export const uploadEventImage = async (uri: string, eventId: string) => {
  const storedToken = await SecureStore.getItemAsync(JWT_KEY);

  return FileSystem.uploadAsync(`${API_URL}/events/${eventId}/upload`, uri, {
    httpMethod: 'POST',
    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    fieldName: 'image',
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  }).then((res) => JSON.parse(res.body));
};
