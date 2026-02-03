// Enunciado 1: (Usuarios activos y sus publicaciones)

// Una aplicación web requiere mostrar un listado de usuarios activos junto con la cantidad
// de publicaciones que han realizado. Sin embargo, no todos los usuarios han creado
// publicaciones. El sistema debe identificar correctamente estos casos.

// Requerimientos
// • Consultar la lista completa de usuarios.
// • Consultar la lista de publicaciones.
// • Identificar cuáles usuarios tienen publicaciones asociadas.
// • Calcular la cantidad de publicaciones por usuario.
// • Mostrar también los usuarios que no tienen publicaciones.

// Datos de entrada
// • Endpoint de usuarios (users).
// • Endpoint de publicaciones (posts).
// • Identificador del usuario (userId)

// Datos de salida
// • Listado de usuarios con:
// o Nombre del usuario
// o Cantidad de publicaciones asociadas (puede ser 0)

// Necesito que me documentes todo el código que realices teniendo en cuenta las mejores prácticas de documentación y el async await. Y que no tenga condicionales ternarios. Que sea solo con for y if normales.


// Declaración de función asíncrona con arrow function
const getUsersAndPosts = async () => {
    // Inicia bloque de manejo de errores
    try {
        // Petición HTTP para obtener usuarios
        const usersResponse = await fetch('http://localhost:3000/users');
        // Petición HTTP para obtener publicaciones
        const postsResponse = await fetch('http://localhost:3000/posts');
        // Convierte respuesta de usuarios a JSON
        const users = await usersResponse.json();
        // Convierte respuesta de publicaciones a JSON
        const posts = await postsResponse.json();

        // Crea array vacío para guardar resultados
        const resultado = [];

        // Itera sobre cada usuario
        for (let i = 0; i < users.length; i++) {
            // Verifica si el usuario está activo
            if (users[i].active == true) {
                // Inicializa contador de publicaciones en 0
                let contador = 0;

                // Itera sobre cada publicación
                for (let j = 0; j < posts.length; j++) {
                    // Compara si la publicación pertenece al usuario actual
                    if (posts[j].userId == users[i].id) {
                        // Incrementa el contador si coincide
                        contador = contador + 1;
                    }
                } // Fin del for de publicaciones

                // Agrega objeto con nombre y cantidad al resultado
                resultado.push({
                    nombre: users[i].name, // Nombre del usuario
                    cantidadPublicaciones: contador // Total de publicaciones
                });
            } // Fin del if de usuario activo
        } // Fin del for de usuarios

        // Imprime encabezado en consola
        console.log('\n=== USUARIOS Y SUS PUBLICACIONES ===\n');

        // Itera sobre el resultado para mostrar cada usuario
        for (let k = 0; k < resultado.length; k++) {
            // Verifica si no tiene publicaciones
            if (resultado[k].cantidadPublicaciones == 0) {
                // Muestra usuario sin publicaciones
                console.log(`${resultado[k].nombre}: Sin publicaciones`);
            } else {
                // Muestra usuario con su cantidad de publicaciones
                console.log(`${resultado[k].nombre}: Publicaciones: ${resultado[k].cantidadPublicaciones}`);
            }
        } // Fin del for de resultados

        // Retorna el array con los resultados
        return resultado;

    } catch (error) {
        // Muestra mensaje de error en consola
        console.error('Error:', error.message);
        // Lanza el error para manejo externo
        throw error;
    }
}; // Fin de la función

// Llama a la función para ejecutarla
getUsersAndPosts();