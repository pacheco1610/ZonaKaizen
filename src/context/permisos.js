import store from '../store/store'
import {permisos_action,habilidades_action} from '../store/actions/permisosActions'

/*Cargamos Permisos del menu y habilidades en firebase y cargamos en el store*/
export function permisos(firebase){
    firebase.database().ref('permisos').on('child_added',snap=>{
        store.dispatch(permisos_action(snap.val()))
    })
    firebase.database().ref('habilidades').on('child_added',snap=>{
        store.dispatch(habilidades_action(snap.val()))
    })
}