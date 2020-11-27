import store from '../store/store'
import {usuario_action} from '../store/actions/usuarioActions'

export function usuarios(firebase,uid){
    firebase.database().ref('usuarios').orderByChild('uid').equalTo(uid).on('child_changed',snap=>{
        const usuario = Object.assign(snap.val(),{registrado:true})
        store.dispatch(usuario_action(usuario))
    })
}
