export function Colaboradores(firebase,snapshot){
    firebase.database().ref('usuarios').orderByChild('empresa').equalTo(snapshot.empresa).on('child_added',snap=>{
        console.log(snap.val())
    })
    firebase.database().ref('usuarios').orderByChild('empresa').equalTo(snapshot.empresa).on('child_removed',snap=>{
        console.log(snap.val())
    })
}