import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchAllApplicationAdapter = createAsyncThunk(
  'fetchAllApplicationAdapter',
  async () => {
    return Promise.resolve()
  }
)
