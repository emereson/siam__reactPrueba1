import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './pagesStyle/createPersonStyle.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePerson = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setSelectedFile(file);
  };

  const handleOnClick = () => {
    document.getElementById('img_per').click();
  };

  const submit = (data) => {
    const url = 'http://localhost:3000/people';

    const formData = new FormData();
    formData.append('nom_per', data.nom_per);
    formData.append('pat_per', data.pat_per);
    formData.append('mat_per', data.mat_per);
    formData.append('nro_doc', data.nro_doc);
    formData.append('fch_nac', data.fch_nac);
    if (selectedFile) {
      formData.append('img_per', selectedFile);
    }

    axios
      .post(url, formData)
      .then((res) => {
        console.log(res.data);
        toast('🦄 Persona agregada exitosamendte 😁!', {
          position: 'top-right',
          autoClose: 5001,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      })
      .catch((err) => console.log(err));
    reset();
  };

  return (
    <div className="createPerson__container">
      <ToastContainer
        position="top-right"
        autoClose={5001}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <h1>Crear Persona</h1>
      <form className="createPerson__form" onSubmit={handleSubmit(submit)}>
        <div className="createPerson__div">
          <label htmlFor="nom_per">Nombre:</label>
          <input {...register('nom_per')} id="nom_per" type="text" required />
        </div>
        <div className="createPerson__div">
          <label htmlFor="pat_per">Apellido Paterno:</label>
          <input {...register('pat_per')} id="pat_per" type="text" required />
        </div>
        <div className="createPerson__div">
          <label htmlFor="mat_per">Apellido Materno:</label>
          <input {...register('mat_per')} id="mat_per" type="text" required />
        </div>
        <div className="createPerson__div">
          <label htmlFor="nro_doc">DNI:</label>
          <input {...register('nro_doc')} id="nro_doc" type="text" required />
        </div>
        <div className="createPerson__div">
          <label htmlFor="fch_nac">Fecha de Nacimiento:</label>
          <input {...register('fch_nac')} id="fch_nac" type="date" required />
        </div>
        <div className="createPerson__img">
          <input
            id="img_per"
            type="file"
            required
            {...register('img_per')}
            onChange={handleImageChange}
            accept="image/*"
          />
          <span className="image__preview">
            {selectedImage && <img src={selectedImage} alt="Preview" />}
          </span>
          <p onClick={handleOnClick}>Cargar Imagen</p>
        </div>
        <button className="create__submit" type="submit">
          Agregar
        </button>
      </form>
    </div>
  );
};

export default CreatePerson;
