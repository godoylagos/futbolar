// Función para capturar foto o video
function captureMedia() {
  const viewer = document.querySelector('model-viewer');
  
  // Comprobar si el navegador admite la API de MediaStream
  if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }) // Pedir acceso a la cámara
      .then(function (stream) {
        const mediaRecorder = new MediaRecorder(stream); // Crear objeto MediaRecorder para grabar video
        const chunks = [];

        // Evento para capturar los datos del video mientras se está grabando
        mediaRecorder.ondataavailable = function (e) {
          chunks.push(e.data);
        };

        // Evento para finalizar la grabación del video
        mediaRecorder.onstop = function (e) {
          const blob = new Blob(chunks, { type: 'video/mp4' });
          const videoUrl = URL.createObjectURL(blob);

          // Crear un enlace para descargar el video
          const downloadLink = document.createElement('a');
          downloadLink.href = videoUrl;
          downloadLink.download = 'captured_video.mp4';
          downloadLink.style.display = 'none';
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);

          // Compartir en redes sociales
          shareMedia(videoUrl);
        };

        // Iniciar la grabación del video al hacer clic en el botón
        mediaRecorder.start();

        // Capturar foto después de 3 segundos
        setTimeout(function () {
          const canvas = document.createElement('canvas');
          canvas.width = viewer.offsetWidth;
          canvas.height = viewer.offsetHeight;
          const context = canvas.getContext('2d');
          context.drawImage(viewer, 0, 0, canvas.width, canvas.height);

          // Convertir el lienzo a imagen y obtener el enlace de descarga
          const imageUri = canvas.toDataURL('image/png');
          const downloadLink = document.createElement('a');
          downloadLink.href = imageUri;
          downloadLink.download = 'captured_image.png';
          downloadLink.style.display = 'none';
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);

          // Detener la grabación del video después de capturar la foto
          mediaRecorder.stop();

          // Compartir en redes sociales
          shareMedia(imageUri);
        }, 3000);
      })
      .catch(function (error) {
        console.error('Error al acceder a la cámara: ', error);
      });
  } else {
    console.error('El navegador no admite la API de MediaStream');
  }
}

// Función para compartir en redes sociales
function shareMedia(mediaUrl) {
  // Aquí puedes implementar la lógica para compartir en redes sociales
  // Puedes utilizar las respectivas APIs de cada plataforma o abrir una ventana emergente con los enlaces de compartir
  // Para cada plataforma (Facebook, Twitter, etc.), se requiere un enlace específico con los par
