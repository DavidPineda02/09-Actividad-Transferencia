// Enunciado 3: (Búsqueda específica de información)

// Un usuario del sistema desea consultar información puntual sobre una publicación
// específica y conocer si existe interacción asociada a ella.

// Requerimientos:
// • Consultar todas las publicaciones.
// • Buscar una publicación específica por su identificador.
// • Consultar los comentarios relacionados con esa publicación.
// • Validar si existen o no comentarios asociados.

// Datos de entrada:
// • ID de la publicación a consultar
// • Endpoint de publicaciones (posts)
// • Endpoint de comentarios (comments)

// Datos de salida:
// • Información detallada de la publicación:
// o Título
// o Contenido
// o Número de comentarios asociados



// Declaración de función asíncrona con arrow function
// Recibe el ID de la publicación como parámetro
const getInformationOfPosts = async (postId) => {
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

        // Variable para almacenar la publicación encontrada
        let publicacionEncontrada = null;

        // Busca la publicación por su ID
        for (let i = 0; i < posts.length; i++) {
            // Compara el ID de la publicación con el ID buscado
            if (posts[i].id == postId) {
                // Guarda la publicación encontrada
                publicacionEncontrada = posts[i];
            }
        } // Fin del for de publicaciones

        // Verifica si se encontró la publicación
        if (publicacionEncontrada == null) {
            // Muestra mensaje si no se encontró
            console.log(`No se encontró la publicación con ID: ${postId}`);
            return null;
        }

        // Contador de comentarios
        let contadorComentarios = 0;

        // Cuenta los comentarios de la publicación
        for (let j = 0; j < comments.length; j++) {
            // Compara si el comentario pertenece a la publicación
            if (comments[j].postId == postId) {
                // Incrementa el contador
                contadorComentarios = contadorComentarios + 1;
            }
        } // Fin del for de comentarios

        // Crea objeto con la información de la publicación
        const resultado = {
            titulo: publicacionEncontrada.title, // Título de la publicación
            contenido: publicacionEncontrada.body, // Contenido de la publicación
            numeroComentarios: contadorComentarios // Total de comentarios
        };

        // Imprime encabezado en consola
        console.log('\n=== INFORMACIÓN DE LA PUBLICACIÓN ===\n');
        // Muestra título
        console.log(`Título: ${resultado.titulo}`);
        // Muestra contenido
        console.log(`Contenido: ${resultado.contenido}`);
        // Muestra cantidad de comentarios
        console.log(`Número de comentarios: ${resultado.numeroComentarios}`);

        // Retorna el objeto con la información
        return resultado;

    } catch (error) {
        // Muestra mensaje de error en consola
        console.error('Error:', error.message);
        // Lanza el error para manejo externo
        throw error;
    }
}; // Fin de la función

// Llama a la función con un ID de ejemplo (puedes cambiar el valor)
getInformationOfPosts(3);