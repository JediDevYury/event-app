import { User } from '@/utils/events';
import axios from 'axios';
import { Platform } from 'react-native';
const env = process.env.NODE_ENV;
let API_URL = process.env.EXPO_PUBLIC_API_URL;
if (env === 'development' && Platform.OS === 'android') {
  API_URL = 'http://10.0.2.2:3000';
}

export interface CommentsResponse {
  comments: Comment[];
}

export interface Comment {
  eventId: string;
  userId: string;
  text: string;
  createdAt: string;
  user?: User;
}

export const addComment = async (data: {
  eventId: string;
  text: string;
}): Promise<CommentsResponse> => {
  const result = await axios.post(`${API_URL}/comments`, data);
  return result.data;
};

export const getCommentsForEvent = async (eventId: string): Promise<CommentsResponse> => {
  const result = await axios.get(`${API_URL}/comments/event/${eventId}`);
  return result.data;
};
