
import store from '../store/store'
import {colaboradores_action,colaborador_action} from '../store/actions/colaboradoresActions'
/*Cargamos Permisos del menu y habilidades en firebase y cargamos en el store*/
export function colaboradores(firebase,empresa){
    firebase.database().ref('usuarios').orderByChild('empresa').equalTo(empresa).on('child_added',snap=>{
        store.dispatch(colaboradores_action(Object.assign(snap.val(),{id:snap.key})))
    })
    firebase.database().ref('usuarios').orderByChild('empresa').equalTo(empresa).on('child_changed',snap=>{
        const filter = store.getState().puestos.puestos.filter(item => item.uid !== snap.key)
        filter.push(Object.assign(snap.val(),{uid:snap.key}))
        store.dispatch(colaborador_action(filter))
    })
}