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
// o “Publicación eliminada correctamente”
// o “No se puede eliminar la publicación porque tiene comentarios”