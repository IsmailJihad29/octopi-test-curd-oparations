import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type EducationalQualifications ={
    degree: string;
    university: string;
    session: string;
    cgpa: string;
  }
  
  type TUserProfile ={ 
    name: string;
    image: string;
    age: number | string;
    nationality: string;
    skills: string[];
    nid: string;
    address: string;
    email: string;
    phone: string;
    website: string;
    gender: string;
    educationalQualifications: EducationalQualifications;
  }

type TInitialState ={
    users: TUserProfile[]
}
const initialState : TInitialState= {
   users : []
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        addUser(state, action: PayloadAction<TUserProfile>) {
            state.users.push(action.payload);
          },
          
    }
    
})

export const { addUser } = userSlice.actions;
export default userSlice.reducer