import { db } from "../firebase/firebase-config";
import { collection, getDocs} from "firebase/firestore";

export const loadNotes = async (uid)=>{
    
    const docRef =  collection (db,`${uid}/journal/notes`);
    const docSnap = await getDocs(docRef);
    const notes = []
    docSnap.forEach((doc) => {
        notes.push({
            id: doc.id,
            ...doc.data()
        })
    });

    return notes
}
