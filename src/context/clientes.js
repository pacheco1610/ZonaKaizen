import store from '../store/store'
import {clientes_action,updateclientes_action} from '../store/actions/clientesActions'

/*Cargamos Permisos del menu y habilidades en firebase y cargamos en el store*/
export function clientes(firebase,empresa){
    firebase.database().ref('clientes').orderByChild('uidempresa').equalTo(empresa).on('child_added',snap=>{
        store.dispatch(clientes_action(Object.assign(snap.val(),{uid:snap.key})))
    })
    firebase.database().ref('clientes').orderByChild('uidempresa').equalTo(empresa).on('child_changed',snap=>{
        const filter = store.getState().puestos.puestos.filter(item => item.uid !== snap.key)
        filter.push(Object.assign(snap.val(),{uid:snap.key}))
        store.dispatch(updateclientes_action(filter))
    })
}
