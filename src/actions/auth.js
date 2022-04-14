import Swal from 'sweetalert2';

import { googleAuthProvider } from "../firebase/firebase-config";
import { getAuth, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut  } from "firebase/auth";
import { types } from "../types/types"
import { finishLoading, startLoading } from "./ui";
import { cleaningNotes } from './notes';

export const startLoginEmailPassword = (email, password)=>{

    return (dispatch)=>{

        const auth = getAuth();
        dispatch(startLoading());
        signInWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
            
            dispatch(login(user.uid, user.displayName));
            dispatch(finishLoading())
            
        })
        .catch((error) => {
           
            dispatch(finishLoading())
            Swal.fire('Error', error.message, 'error')
        });

    }
}

export const startGoogleLogin = ()=>{

    return(dispatch)=>{

        const auth = getAuth();

        signInWithPopup(auth, googleAuthProvider)
        .then(({user}) =>{

            dispatch(
                login(user.uid, user.displayName)
            )
            
        })
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name)=>{
    return (dispatch)=>{
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
        .then(async({user}) => {

            await updateProfile(auth.currentUser,{displayName: name})

            dispatch(
                login(user.uid, user.displayName)
            )
            
        })
        .catch((error) => {
           
           Swal.fire('Error', error.message, 'error');
        });
    }
}

export const login = (uid, displayName) =>({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

export const startLogout = ()=>{
    return async (dispatch)=>{
        const auth = getAuth();
        await signOut(auth);
        dispatch(cleaningNotes());
        dispatch(logout())
    }
}

export const logout = ()=>({
    type:types.logout
})


