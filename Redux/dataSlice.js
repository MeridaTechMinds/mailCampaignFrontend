import { getallDomainForAdminAPI } from "@/axiosAPIs/apiCalls";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
    domains: null,
    loading: null
}

export const getAllDomainForAdmin = createAsyncThunk('data/getAllDomainForAdmin', async (_, { rejectWithValue }) => {
    try {
        let responseData = await getallDomainForAdminAPI()
        return responseData
    } catch (error) {
        console.log(error);
        return rejectWithValue(error)
    }
})

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllDomainForAdmin.fulfilled, (state, action) => { state.loading = null; state.domains = action.payload || [] })
            .addCase(getAllDomainForAdmin.rejected, (state) => { state.loading = null; state.domains = null })
            .addCase(getAllDomainForAdmin.pending, (state) => { state.loading = 'domain'; })
    }
})

export default dataSlice.reducer