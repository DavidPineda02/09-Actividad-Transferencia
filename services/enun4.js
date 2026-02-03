// Enunciado 4: (Eliminación lógica y validación de datos)

// Antes de eliminar una publicación, el sistema debe validar si dicha publicación tiene
// comentarios asociados. Si tiene comentarios, no debe eliminarse; de lo contrario, puede
// proceder.

// Requerimientos:
// • Consultar las publicaciones.
// • Consultar los comentarios.
// • Verificar si una publicación específica tiene comentarios.
// • Si no tiene comentarios, ejecutar la eliminación.
// • Validar el resultado mediante una nueva consulta.

// Datos de entrada:
// • ID de la publicación
// • Endpoint de publicaciones (posts)
// • Endpoint de comentarios (comments)

// Datos de salida:
// • Mensaje de resultado:
// o "Publicación eliminada correctamente"
// o "No se puede eliminar la publicación porque tiene comentarios"



// Declaración de función asíncrona con arrow function
// Recibe el ID de la publicación a eliminar
const deletePostsWithValidation = async (postId) => {
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

        // Variable para verificar si la publicación existe
        let publicacionExiste = false;

        // Busca si la publicación existe
        for (let i = 0; i < posts.length; i++) {
            // Compara el ID de la publicación
            if (posts[i].id == postId) {
                // Marca que la publicación existe
                publicacionExiste = true;
            }
        } // Fin del for de publicaciones

        // Verifica si la publicación existe
        if (publicacionExiste == false) {
            // Muestra mensaje si no existe
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

        // Verifica si tiene comentarios
        if (contadorComentarios > 0) {
            // Muestra mensaje de error
            console.log('\n=== RESULTADO ===\n');
            console.log('No se puede eliminar la publicación porque tiene comentarios');
            console.log(`Cantidad de comentarios: ${contadorComentarios}`);
            return { eliminado: false, mensaje: 'No se puede eliminar la publicación porque tiene comentarios' };
        }

        // Si no tiene comentarios, procede a eliminar
        // Petición HTTP DELETE para eliminar la publicación
        const deleteResponse = await fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'DELETE' // Método HTTP para eliminar
        });

        // Verifica si la eliminación fue exitosa
        if (deleteResponse.ok) {
            // Muestra mensaje de éxito
            console.log('\n=== RESULTADO ===\n');
            console.log('Publicación eliminada correctamente');
            return { eliminado: true, mensaje: 'Publicación eliminada correctamente' };
        } else {
            // Muestra mensaje de error en la eliminación
            console.log('\n=== RESULTADO ===\n');
            console.log('Error al eliminar la publicación');
            return { eliminado: false, mensaje: 'Error al eliminar la publicación' };
        }

    } catch (error) {
        // Muestra mensaje de error en consola
        console.error('Error:', error.message);
        // Lanza el error para manejo externo
        throw error;
    }
}; // Fin de la función

// Llama a la función con un ID de ejemplo (puedes cambiar el valor)
deletePostsWithValidation(1);