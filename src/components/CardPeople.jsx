import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './styleComponent/cardPeopleStyle.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CardPeople = ({ person }) => {
  const [editPerson, setEditPerson] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [viewImg, setViewImg] = useState(true);
  const [activeOptions, setactiveOptions] = useState(true);

  const [formData, setFormData] = useState({
    nom_per: person.nom_per,
    pat_per: person.pat_per,
    mat_per: person.mat_per,
    nro_doc: person.nro_doc,
    fch_nac: person.fch_nac,
    img_per: person.img_per,
  });

  useEffect(() => {
    setSelectedFile(person.img_per);
  }, [person.img_per]);

  const { register, handleSubmit } = useForm();
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setSelectedFile(file);
  };

  const handleOnClick = () => {
    fileInputRef.current.click();
    setViewImg(false);
  };

  const submit = (data) => {
    const url = `http://localhost:3000/people/${person.ide_per}`;
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
      .patch(url, formData)
      .then((res) => {
        console.log(res.data);
        setEditPerson(true);
        toast('🦄 Los Datos se actualizaron exitosamendte 🚗!', {
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
  };

  const deletePerson = () => {
    const url = `http://localhost:3000/people/${person.ide_per}`;

    axios
      .delete(url)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const toastOptions = {
    position: 'top-right',
    autoClose: 5001,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: 'dark',
  };

  const optionIcons = () => {
    return (
      <>
        <span className="cardPerson__edit cadPerson__delete" onClick={deletePerson}>
          <i className="bx bxs-trash"></i>
        </span>
        {activeOptions ? (
          <span className="cardPerson__edit" onClick={() => setactiveOptions(false)}>
            <i className="bx bx-dots-horizontal-rounded"></i>
          </span>
        ) : (
          <span className="cardPerson__edit" onClick={() => setactiveOptions(true)}>
            <i className="bx bx-dots-horizontal-rounded"></i>
          </span>
        )}
      </>
    );
  };
  return (
    <div className="cardPeople__container">
      <ToastContainer {...toastOptions} />
      {editPerson ? (
        <div className="cardPerson__contianer">
          <div className="cardPerson__img">
            <img src={person.img_per} alt="" />
          </div>
          <ul className="cardPerson__ul">
            <li className="cardPerson__name">{person.nom_per}</li>
            <li className="cardPerson__date">
              Apellidos: {person.pat_per} {person.mat_per}
            </li>
            <li className="cardPerson__date">DNI: {person.nro_doc} </li>
            <li className="cardPerson__date">Fecha de Nacimiento: {person.fch_nac}</li>
          </ul>
          <div className={`cardPerson__options ${activeOptions ? 'options__close' : ''}`}>
            <span className="cardPerson__edit" onClick={() => setEditPerson(false)}>
              <i className="bx bxs-edit-alt"></i>
            </span>
            {optionIcons()}
          </div>
        </div>
      ) : (
        <form className="cardPerson__contianer" onSubmit={handleSubmit(submit)}>
          <div className="cardPerson-file-input">
            <input
              id="img_per"
              type="file"
              {...register('img_per')}
              onChange={handleImageChange}
              ref={fileInputRef}
            />
            {viewImg ? (
              <p className="cardPerson__viewImg" onClick={handleOnClick}>
                <img src={person.img_per} alt="" />
              </p>
            ) : (
              <div className="cardPerson__viewImg" onClick={handleOnClick}>
                <img src={selectedImage === '' ? person.img_per : selectedImage} alt="Preview" />
              </div>
            )}
          </div>
          <ul>
            <li className="cardPerson__name">
              <input
                type="text"
                name="nom_per"
                defaultValue={formData.nom_per}
                {...register('nom_per')}
              />
            </li>
            <li className="cardPerson__date">
              Apellidos:
              <input
                type="text"
                name="pat_per"
                defaultValue={formData.pat_per}
                {...register('pat_per')}
              />
              <input
                type="text"
                name="mat_per"
                defaultValue={formData.mat_per}
                {...register('mat_per')}
              />
            </li>
            <li className="cardPerson__date">
              DNI:
              <input
                type="text"
                name="nro_doc"
                defaultValue={formData.nro_doc}
                {...register('nro_doc')}
              />
            </li>
            <li className="cardPerson__date">
              Fecha de Nacimiento:
              <input
                type="date"
                name="fch_nac"
                defaultValue={formData.fch_nac}
                {...register('fch_nac')}
              />
            </li>
          </ul>
          <div className={`cardPerson__options ${activeOptions ? 'options__close' : ''}`}>
            <button className="cardPerson__edit" type="submit">
              <i className="bx bxs-save"></i>
            </button>
            {optionIcons()}
          </div>
        </form>
      )}
    </div>
  );
};

export default CardPeople;
