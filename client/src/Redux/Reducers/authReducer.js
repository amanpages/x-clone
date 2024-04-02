
// reducer for all authentication related operations

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from '../../utils/axios';
import { getFollowPostThunk } from "./postReducer";

// toast notification
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// initial state
const initialState = { isLoading:false,
                        loggedInUser:{},
                        allUsers:[],
                        follows:[],
                        followers:[],
                        userProfile:{}
                    };

// follow and unfollow
export const toggelFollowThunk = createAsyncThunk(
    'auth/toggleFollow',
    async ({userId},thunkAPI) => {
        try {
            const isToken = localStorage.getItem('token');
            if(!isToken){
                return {
                    success:false,
                    message:'Unauthorized'
                }
            }
            const token = JSON.parse(isToken);
            const response = await axiosInstance.put(`/user/togglefollow?userId=${userId}`,{},{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });
            thunkAPI.dispatch(setLoggedInUser(response.data.userOne));
            thunkAPI.dispatch(getIFollowThunk());
            thunkAPI.dispatch(getFollowPostThunk())
            return response.data;
        } catch (error) {
            return {
                success:false,
                message:error.response.data.error
            }
        }
    }
)

// list of all the user's 
export const getAllUserThunk = createAsyncThunk(
    'auth/getalluser',
    async (args,thunkAPI) => {
        try {
            const isToken = localStorage.getItem('token');
            if(!isToken){
                return {
                    success:false,
                    message:'Unauthorized'
                }
            }
            const token = JSON.parse(isToken);
            const response = await axiosInstance.get('/user/alluser',{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });
            thunkAPI.dispatch(setAllUsers(response.data.users));
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }
)

// sigup 
export const signUpThunk = createAsyncThunk(
    'auth/signup',
    async (data,thunkAPI) => {
        try {
            const response = await axiosInstance.post('/user/signup',data,{
                headers: { 'Content-type': 'multipart/form-data' },
              });
            return response.data;
        } catch (error) {
            return {
                success:false,
                message:error.response.data.error
            }
        }
    }
)

// signin
export const signInThunk = createAsyncThunk(
    'auth/signin',
    async (data,thunkAPI) => {
        try{
            const response = await axiosInstance.post('/user/signin',data);
            localStorage.setItem('user',JSON.stringify(response.data.user));
            localStorage.setItem('token',JSON.stringify(response.data.token));
            thunkAPI.dispatch(setLoggedInUser(response.data.user))
            return response.data;
        }catch(error){
            return {
                success:false,
                message:error.response.data.error
            }
        }
    }
)


// signout
export const signOutThunk = createAsyncThunk(
    'auth/signout',
    async (args,thunkAPI) => {
        try{
            const isToken = localStorage.getItem('token');
            if(!isToken){
                return {
                    success:false,
                    // message:'Unauthorized'
                }
            }
            const token = JSON.parse(isToken);
            const response = await axiosInstance.get('/user/signout',{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            thunkAPI.dispatch(setLoggedInUser(null));
            return response.data;
        }catch(error){
            return {
                success:false,
                message:error.response.data.error
            }
        }
    }
)


// data of logged in user
export const getLoggedInUserThunk = createAsyncThunk(
    'auth/getLoggedInUser',
    (args,thunkAPI) => {
        const isUserLoggedIn = localStorage.getItem('user');
        if(isUserLoggedIn){
            const user = JSON.parse(isUserLoggedIn);
            thunkAPI.dispatch(setLoggedInUser(user));
        }
    }
)


// list of people user follows
export const getIFollowThunk = createAsyncThunk(
    'auth/getIFollow',
    async (args,thunkAPI) => {
        try {
            const isToken = localStorage.getItem('token');
            if(!isToken){
                return ;
            }
            const token = JSON.parse(isToken);
            const response = await axiosInstance.get('/user/myfollows',{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });
            thunkAPI.dispatch(setFollows(response.data.follows))
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }
)

// list of people following user
export const getMyFollowersThunk = createAsyncThunk(
    'auth/getMyFollower',
    async (args,thunkAPI) => {
        try {
            const isToken = localStorage.getItem('token');
            if(!isToken){
                return ;
            }
            const token = JSON.parse(isToken);
            const response = await axiosInstance.get('/user/myfollower',{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });
            thunkAPI.dispatch(setFollowers(response.data.followers))
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }
)


// for update the data of user 
export const updateInfoThunk = createAsyncThunk(
    'auth/updateInfo',
    async({id,data},thunkAPI) => {
        try {
            const isToken = localStorage.getItem('token');
            if(!isToken){
                return {
                    success:false,
                    message:'Unauthorized'
                }
            }
            const token = JSON.parse(isToken);
            const response = await axiosInstance.put('/user/updateinfo',data,{
                headers: { 'Content-type': 'multipart/form-data' ,
                    'Authorization':`Bearer ${token}`
                }
            });
            localStorage.setItem('user',JSON.stringify(response.data.user));
            thunkAPI.dispatch(setLoggedInUser(response.data.user));
            return response.data;
        } catch (error) {
            return {
                success:false,
                message:error.response.data.error
            }
        }
    }
)

// for update the password
export const updatePasswordThunk = createAsyncThunk(
    'auth/updatePassword',
    async({data},thunkAPI) => {
        try {
            const isToken = localStorage.getItem('token');
            if(!isToken){
                return {
                    success:false,
                    message:'Unauthorized'
                }
            }
            const token = JSON.parse(isToken);
            const response = await axiosInstance.put('/user/updatepassword',data,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            return {
                success:false,
                message:error.response.data.error
            }
        }
    }
)


// for deleting account
export const deleteAccountThunk = createAsyncThunk(
    'auth/deleteAccount',
    async({data},thunkAPI) => {
        try {
            const isToken = localStorage.getItem('token');
            if(!isToken){
                return {
                    success:false,
                    message:'Unauthorized'
                }
            }
            const token = JSON.parse(isToken);
            const response = await axiosInstance.put('/user/deleteaccount',data,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            return {
                success:false,
                message:error.response.data.error
            }
        }
    }
)


// reducers
const authSlice = createSlice({
    name:'authentication',
    initialState,
    reducers:{
        setLoggedInUser:(state,action) => {
            state.loggedInUser = action.payload;
            return;
        },
        setAllUsers:(state,action) => {
            state.allUsers = [...action.payload];
            return;
        },
        setFollows:(state,action) => {
            state.follows = action.payload;
            return;
        },
        setFollowers:(state,action) => {
            state.followers = action.payload;
            return;
        },
        setUserProfile:(state,action) => {
            state.userProfile = action.payload;
            return;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(signUpThunk.pending,(state,action) => {
            state.isLoading = true;
        })
        .addCase(signUpThunk.fulfilled || signUpThunk.rejected, (state,action) => {
            state.isLoading = false;
        })
        .addCase(signInThunk.pending,(state,action) => {
            state.isLoading = true;
        })
        .addCase(signInThunk.fulfilled || signInThunk.rejected, (state,action) => {
            state.isLoading = false;
        })
        .addCase(signOutThunk.pending,(state,action) => {
            state.isLoading = true;
        })
        .addCase(signOutThunk.fulfilled || signOutThunk.rejected, (state,action) => {
            state.isLoading = false;
        })
        .addCase(getLoggedInUserThunk.pending,(state,action) => {
            state.isLoading = true;
        })
        .addCase(getLoggedInUserThunk.fulfilled || getLoggedInUserThunk.rejected,(state,action) => {
            state.isLoading = false;
        })
        .addCase(updateInfoThunk.pending,(state,action) => {
            state.isLoading = true;
        })
        .addCase(updateInfoThunk.fulfilled || updateInfoThunk.rejected,(state,action) => {
            state.isLoading = false;
        })
        .addCase(updatePasswordThunk.pending,(state,action) => {
            state.isLoading = true;
        })
        .addCase(updatePasswordThunk.fulfilled || updatePasswordThunk.rejected,(state,action) => {
            state.isLoading = false;
        })
        .addCase(deleteAccountThunk.pending,(state,action) => {
            state.isLoading = true;
        })
        .addCase(deleteAccountThunk.fulfilled || deleteAccountThunk.rejected,(state,action) => {
            state.isLoading = false;
        })
    }
})

export const authReducer = authSlice.reducer;

export const { setLoggedInUser, setAllUsers, setFollows, setFollowers , setUserProfile } = authSlice.actions;

export const authSelector = (state) => state.authReducer;