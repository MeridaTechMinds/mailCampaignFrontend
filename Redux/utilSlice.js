import { getUserDataApi } from "@/axiosAPIs/apiCalls";
import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit"

const initialState = {
    userData: null,
    loading: null,
    errorData: null,
    activePage: null
}

export const getUserDataToken = createAsyncThunk('util/getUserDataToken', async (_, { rejectWithValue }) => {
    try {
        let responseData = await getUserDataApi()
        return responseData
    } catch (error) {
        console.log(error, 'Token check error');
        return rejectWithValue(error)
    }
})
const utilSlice = createSlice({
    name: 'util',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        setActivePage: (state, action) => {
            state.activePage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserDataToken.pending, (state) => { state.loading = "user", state.errorData = null })
            .addCase(getUserDataToken.fulfilled, (state, action) => {
                state.loading = false; state.errorData = null;
                state.userData = action.payload
            })
            .addCase(getUserDataToken.rejected, (state) => { state.loading = false, state.errorData = "user", state.userData = null })
    }
})


export let { setUserData, setActivePage } = utilSlice.actions
export default utilSlice.reducer