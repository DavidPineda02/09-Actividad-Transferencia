// Enunciado 2: (Publicaciones con y sin comentarios)

// El área de contenido necesita identificar qué publicaciones han generado interacción y
// cuáles no. Para ello, se requiere analizar las publicaciones y sus comentarios asociados.

// Requerimientos:
// • Consultar todas las publicaciones.
// • Consultar todos los comentarios.
// • Relacionar comentarios con sus publicaciones.
// • Identificar publicaciones sin comentarios.
// • Clasificar publicaciones según tengan o no comentarios.

// Datos de entrada:
// • Endpoint de publicaciones (posts)
// • Endpoint de comentarios (comments)
// • Identificador de la publicación (postId)

// Datos de salida:
// • Listado de publicaciones con:
// o Título
// o Número de comentarios
// o Estado: "Con comentarios" o "Sin comentarios"



// Declaración de función asíncrona con arrow function
const getPostsWithComments = async () => {
    // Inicia bloque de manejo de errores
    try {
        // Petición HTTP para obtener publicaciones
        const postsResponse = await fetch('http://localhost:3000/posts');
        // Petición HTTP para obtener comentarios
        const commentsResponse = await fetch('http://localhost:3000/comments');
        // Convierte respuesta de publicaciones a JSON
        const posts = await postsResponse.json();
        // Convierte respuesta de comentarios a JSON
        const comments = await commentsResponse.json();

        // Crea array vacío para guardar resultados
        const resultado = [];

        // Itera sobre cada publicación
        for (let i = 0; i < posts.length; i++) {
            // Inicializa contador de comentarios en 0
            let contador = 0;

            // Itera sobre cada comentario
            for (let j = 0; j < comments.length; j++) {
                // Compara si el comentario pertenece a la publicación actual
                if (comments[j].postId == posts[i].id) {
                    // Incrementa el contador si coincide
                    contador = contador + 1;
                }
            } // Fin del for de comentarios

            // Define el estado según tenga o no comentarios
            let estado = '';
            if (contador == 0) {
                estado = 'Sin comentarios';
            } else {
                estado = 'Con comentarios';
            }

            // Agrega objeto con título, cantidad y estado al resultado
            resultado.push({
                titulo: posts[i].title, // Título de la publicación
                numeroComentarios: contador, // Total de comentarios
                estado: estado // Estado de la publicación
            });
        } // Fin del for de publicaciones

        // Imprime encabezado en consola
        console.log('\n=== PUBLICACIONES Y SUS COMENTARIOS ===\n');

        // Itera sobre el resultado para mostrar cada publicación
        for (let k = 0; k < resultado.length; k++) {
            // Muestra título, cantidad de comentarios y estado
            console.log(`${resultado[k].titulo}: ${resultado[k].numeroComentarios} comentarios - ${resultado[k].estado}`);
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
getPostsWithComments();