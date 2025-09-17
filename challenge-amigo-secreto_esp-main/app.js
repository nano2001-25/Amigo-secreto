// Array para almacenar los nombres de los amigos
let amigos = [];

// Función para agregar un amigo a la lista
function agregarAmigo() {
    // Capturar el valor del campo de entrada
    const nombreInput = document.getElementById('nombre-amigo');
    const nombre = nombreInput.value.trim();
    
    // Validar la entrada
    if (nombre === '') {
        alert('Por favor, inserte un nombre.');
        return;
    }
    
    // Añadir el nombre al array
    amigos.push(nombre);
    
    // MOSTRAR EN CONSOLA - línea agregada
    console.log('Amigo agregado:', nombre);
    console.log('Lista actual de amigos:', amigos);
    
    // Actualizar la lista visual
    actualizarListaAmigos();
    
    // Limpiar el campo de entrada
    nombreInput.value = '';
    nombreInput.focus();
}

// Función para actualizar la lista visual de amigos
function actualizarListaAmigos() {
    const listaAmigos = document.getElementById('lista-amigos');
    
    // Si no hay amigos, mostrar mensaje
    if (amigos.length === 0) {
        listaAmigos.innerHTML = '<li class="empty-message">No hay amigos agregados todavía</li>';
        return;
    }
    
    // Generar la lista de amigos
    listaAmigos.innerHTML = '';
    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${amigo} 
            <button class="delete-btn" onclick="eliminarAmigo(${index})">Eliminar</button>
        `;
        listaAmigos.appendChild(li);
    });
}

// Función para eliminar un amigo de la lista
function eliminarAmigo(index) {
    // MOSTRAR EN CONSOLA al eliminar
    console.log('Amigo eliminado:', amigos[index]);
    
    amigos.splice(index, 1);
    
    // MOSTRAR LISTA ACTUALIZADA EN CONSOLA
    console.log('Lista actual de amigos:', amigos);
    
    actualizarListaAmigos();
}

// Función para mezclar array (algoritmo Fisher-Yates)
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Función para realizar el sorteo
function sortearAmigos() {
    if (amigos.length < 2) {
        alert('Se necesitan al menos 2 participantes para realizar el sorteo.');
        return;
    }
    
    // MOSTRAR EN CONSOLA antes del sorteo
    console.log('Iniciando sorteo con amigos:', amigos);
    
    // Crear copia del array y mezclarlo
    const amigosMezclados = mezclarArray([...amigos]);
    
    // Realizar las asignaciones
    const asignaciones = [];
    for (let i = 0; i < amigos.length; i++) {
        const da = amigos[i];
        const recibe = amigosMezclados[i];
        
        // Si alguien se tiene a sí mismo, volver a mezclar
        if (da === recibe) {
            return sortearAmigos();
        }
        
        asignaciones.push({ da, recibe });
    }
    
    // MOSTRAR RESULTADO EN CONSOLA
    console.log('Resultado del sorteo:');
    asignaciones.forEach(asignacion => {
        console.log(`${asignacion.da} -> ${asignacion.recibe}`);
    });
    
    // Mostrar resultados
    mostrarResultados(asignaciones);
}

// Función para mostrar los resultados del sorteo
function mostrarResultados(asignaciones) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.style.display = 'block';
    resultadoDiv.innerHTML = '';
    
    const titulo = document.createElement('li');
    titulo.innerHTML = '<strong>🎉 Resultados del Sorteo 🎉</strong>';
    titulo.style.textAlign = 'center';
    titulo.style.marginBottom = '15px';
    titulo.style.backgroundColor = 'transparent';
    titulo.style.boxShadow = 'none';
    resultadoDiv.appendChild(titulo);
    
    asignaciones.forEach(asignacion => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${asignacion.da}</strong> tiene que hacerle un regalo a <strong>${asignacion.recibe}</strong>`;
        resultadoDiv.appendChild(li);
    });
}

// Inicializar la lista cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    actualizarListaAmigos();
    
    // Permitir agregar amigos con la tecla Enter
    document.getElementById('nombre-amigo').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            agregarAmigo();
        }
    });
    
    // MOSTRAR EN CONSOLA al cargar la página
    console.log('Página de Amigo Secreto cargada correctamente');
});