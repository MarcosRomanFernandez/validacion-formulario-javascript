
const firebaseConfig = {
    apiKey: "AIzaSyC9Be5P2lEemLk-6J9EfC_j64EEDW38TZ0",
    authDomain: "datos-de-formulario-59922.firebaseapp.com",
    projectId: "datos-de-formulario-59922",
    storageBucket: "datos-de-formulario-59922.appspot.com",
    messagingSenderId: "639968194948",
    appId: "1:639968194948:web:3ff634c5063d2c2cf42dd1",
    measurementId: "G-XECWK060XJ"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();





document.getElementById('formulario').addEventListener('submit', (event) =>{
    event.preventDefault()
    
    //VALIDAR CAMPO NOMBRE
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')
    
    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor introducí tu nombre'
        errorNombre.classList.add('error-message')
    } else{
    errorNombre.textContent = ''
    errorNombre.classList.remove('error-message')
}
//VALIDAR CORREO ELECTRONICO
let entradaEmail = document.getElementById('email')
let emailError = document.getElementById('emailError')
let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Patrón de validación básico

if (!emailPattern.test(entradaEmail.value)) {
    emailError.textContent = 'Introduzca un Email Válido'
    emailError.classList.add('error-message')
} else{
    emailError.textContent = ''
    errorNombre.classList.remove('error-message')
}

//VALIDAR LA CONTRASEÑA
let contraseñaEntrada = document.getElementById('password')
let contraseñaError = document.getElementById('passwordError')
let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,16}$/; //Patrón de validación básico

if (!contraseñaEntrada.value.lenght < 8 && !contrasenaPattern.test(contraseñaEntrada.value)) {
    contraseñaError.textContent = 'la Contraseña debe tener al menos 8 caracteres a 16, Números, Mayúscula, Minúscula y caracteres especiales'
    contraseñaError.classList.add('error-message')
} else{
    contraseñaError.textContent = ''
    contraseñaError.classList.remove('error-message')
}

// SI TODOS LOS CAMPOS SON VÁLIDO ENVIAR FORMULARIO
if(!errorNombre.textContent && !emailError.textContent && !contraseñaError.textContent){
    // Backend que reciba la información
    db.collection("users").add({
        nombre: entradaNombre.value,
        email: entradaEmail.value,
        password: contraseñaEntrada.value
    })
    .then((docRef) => {
        alert('el formulario se ha enviado con éxito', docRef.id);
        document.getElementById('formulario').reset();
    })
    .catch((error) => {
        alert(error);
    });

}
});