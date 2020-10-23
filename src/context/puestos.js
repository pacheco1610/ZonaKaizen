import store from '../store/store'
import {puestos_action,updatepuestos_action} from '../store/actions/puestosActions'

/*Cargamos Permisos del menu y habilidades en firebase y cargamos en el store*/
export function puestos(firebase,empresa){
    firebase.database().ref('puestos').orderByChild('empresa').equalTo(empresa).on('child_added',snap=>{
        store.dispatch(puestos_action(Object.assign(snap.val(),{uid:snap.key})))
    })
    firebase.database().ref('puestos').orderByChild('empresa').equalTo(empresa).on('child_changed',snap=>{
        const filter = store.getState().puestos.puestos.filter(item => item.uid !== snap.key)
        filter.push(Object.assign(snap.val(),{uid:snap.key}))
        store.dispatch(updatepuestos_action(filter))
    })
}
