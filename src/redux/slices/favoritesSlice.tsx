import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface FavoriteState {
  items: any[]; // Ideally, you define a proper Event type
}

const initialState: FavoriteState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<any>) => {
      const exists = state.items.find(
        item => item.event_id === action.payload.event_id,
      );
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        item => item.event_id !== action.payload,
      );
    },
  },
});

export const {addFavorite, removeFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer;
