import { User } from '@/utils/events';
import axios from 'axios';
import { Platform } from 'react-native';

const env = process.env.NODE_ENV;
let API_URL = process.env.EXPO_PUBLIC_API_URL;
if (env === 'development' && Platform.OS === 'android') {
  API_URL = 'http://10.0.2.2:3000';
}
export interface AttendanceResponse {
  attendance: Attendance[];
}

export interface Attendance {
  eventId: string;
  userId: string;
  status: string;
  modifiedAt: string;
  user?: User;
  event?: {
    title: string;
    id: string;
    start: string;
    image: string;
  };
}

export const attendEvent = async (data: {
  eventId: string;
  status: string;
}): Promise<AttendanceResponse> => {
  const result = await axios.post(`${API_URL}/attendance`, data);
  return result.data;
};

export const cancelAttendance = async (eventId: string): Promise<AttendanceResponse> => {
  const result = await axios.delete(`${API_URL}/attendance/event/${eventId}`);
  return result.data;
};

export const getAttendanceForEvent = async (eventId: string): Promise<AttendanceResponse> => {
  const result = await axios.get(`${API_URL}/attendance/event/${eventId}`);
  return result.data;
};

export const getAttendanceForUser = async (userId: string): Promise<AttendanceResponse> => {
  const result = await axios.get(`${API_URL}/attendance/user/${userId}`);
  return result.data;
};
