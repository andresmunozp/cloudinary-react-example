const form = document.querySelector('#form')

form.addEventListener('submit', async (e) => {
  // No se maneja estado de react, si hay alguna necesidad de usar el estado por ejemplo para agregar validaciones personalisadas la logica es la misma solo que se deja usar los formData por la info del useState ( const formData = useState({name: ''}) )

  // El userData se rellena dependiendo de los inputs en el form, si el input es de tipo File entonces ese archivo se sube primero a cloudinary y despues agregar la url retornada por cloudinary al userData, una vez se hallan subido todos los archivos a cloudinary se realiza la peticion para enviar la informacion del usuario al backend

  // tener encuenta el atributo name de los inputs, ya que es lo que se usa para formar el objeto userData y el que se usa como nombre de carpeta en cloudinary en caso de que el input sea type file

  e.preventDefault()
  const formData = new FormData(e.target)
  const cloudinaryFormData = new FormData()
  cloudinaryFormData.append('upload_preset', 'rbavl8uy');
  cloudinaryFormData.append('cloud_name', 'dcgtdt02k');

  const userData = {}

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      cloudinaryFormData.append('file', value)
      cloudinaryFormData.append('folder', key)

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dcgtdt02k/image/upload`,
        {
          method: 'post',
          body: cloudinaryFormData,
        }
      );

      const data = await response.json()
      userData[key] = data.url

      continue
    }

    userData[key] = value
  }
  // ENVIAR INFO DE REGISTRO AL BACKEND
  // fetch('https://[api-url]/register', {
  //   method: 'post',
  //   body: JSON.stringify(userData),
  // });
})
