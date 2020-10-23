import store from '../store/store'
import {empresa_action} from '../store/actions/empresaActions'

export function empresa(firebase,empresa){
    firebase.database().ref('empresas').orderByChild('propietario').equalTo(empresa).on('child_added',snap=>{
        store.dispatch(empresa_action(snap.val().nombre))
    })
}