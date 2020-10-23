import store from '../store/store'
import {tareas_action,updatetarea_action} from '../store/actions/tareasActions'

/*Cargamos Permisos del menu y habilidades en firebase y cargamos en el store*/
export function tareas(firebase,empresa,uid){
    firebase.database().ref('tareas').orderByChild('empresa').equalTo(empresa).on('child_added',snap=>{
        if (snap.val().autorizacion !== true) {
            const misdatos = (snap.val().responsables.filter(item => item.uid === uid))[0]
            if (snap.val().asignador===uid||misdatos.uid===uid) {
                store.dispatch(tareas_action(Object.assign(snap.val(),{minfo:misdatos,uidTarea:snap.key})))
            }
        }
        
    })
    firebase.database().ref('tareas').orderByChild('empresa').equalTo(empresa).on('child_changed',snap=>{
        if (snap.val().autorizacion !== true) {
            const misdatos = (snap.val().responsables.filter(item => item.uid === uid))[0]
            if (snap.val().asignador===uid||misdatos.uid===uid) {
                const filter = store.getState().tareas.tareas.filter(item => item.uidTarea !== snap.key)
                filter.push(Object.assign(snap.val(),{minfo:misdatos,uidTarea:snap.key}))
                store.dispatch(updatetarea_action(filter))
            }
        }
    })
}
