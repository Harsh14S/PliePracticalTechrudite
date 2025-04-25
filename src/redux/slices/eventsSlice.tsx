import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export interface EventItem {
  event_id: number;
  event_date_id: number;
  [key: string]: any;
}

interface EventsState {
  items: EventItem[];
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchEvents = createAsyncThunk<EventItem[], string>(
  'events/fetchEvents',
  async (token, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'http://3.7.81.243/projects/plie-api/public/api/events-listing',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data.data.events;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch events',
      );
    }
  },
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEvents.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default eventsSlice.reducer;
