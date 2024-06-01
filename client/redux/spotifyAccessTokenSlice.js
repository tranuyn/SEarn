import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSpotifyAccessToken = createAsyncThunk(
  "accessToken/fetchAccessToken",
  async (_, { rejectWithValue }) => {
    try {
      console.log("INside fetch function");
      const response = await axios.get(
        "https://8043-2405-4802-a3f1-4500-91f7-adb8-c182-547d.ngrok-free.app/auth/getAccessToken"
      );
      return response.data.accessToken;
    } catch (error) {
      return rejectWithValue("error.response.data");
    }
  }
);

const accessTokenSlice = createSlice({
  name: "accessToken",
  initialState: {
    accessTokenForSpotify: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchAccessTokenRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAccessTokenSuccess: (state, action) => {
      state.loading = false;
      state.accessTokenForSpotify = action.payload;
    },
    fetchAccessTokenFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpotifyAccessToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpotifyAccessToken.fulfilled, (state, action) => {
        state.loading = false;
        state.accessTokenForSpotify = action.payload;
      })
      .addCase(fetchSpotifyAccessToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  fetchAccessTokenRequest,
  fetchAccessTokenSuccess,
  fetchAccessTokenFailure,
} = accessTokenSlice.actions;
export default accessTokenSlice.reducer;
