import { createAsyncThunk } from '@reduxjs/toolkit';
import { showAllApplication } from '@services/http/application/show';

export const fetchAllApplication = createAsyncThunk(
  'fetchWebPushSettingsAndApplication',
  async ({ take, skip }: { take: number; skip: number }) => {
    return showAllApplication(take, skip).catch(e => e)
  }
)
