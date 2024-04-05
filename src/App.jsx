import { useState } from 'react';

const App = () => {
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', '');
    formData.append('cloud_name', '');

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dcgtdt02k/image/upload',
        {
          method: 'post',
          body: formData,
        }
      );

      const data = await response.json();

      setUrl(data.url);

      // Para subir la url de la imagen, suponiendo que esta es la página de registro
      /*
        fetch('https://[api-url]/register', {
          method: 'post',
          body: {
            // required data
            imageUrl: data.url,
          },
        });
      */
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        ></input>
        <button onClick={uploadImage}>Upload</button>
      </div>
      <div>
        <h1>Uploaded image will be displayed here</h1>
        <img src={url} />
      </div>
    </div>
  );
};

export default App;
