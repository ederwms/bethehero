import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import { custAxios } from '../../../services/api'
import Const from '../../../helpers/const'

import './styles.css'

import LogoImg from '../../../assets/logo.svg'

export default function NewIncident () {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')

  const history = useHistory()

  function addNewIncident (e) {
    e.preventDefault()

    const data = {
      title,
      description,
      value
    }

    try {
      custAxios().post(`${Const.API_INCIDENT}`, data)
        .then((response) => {
          history.push('/profile')
        })
    } catch (err) {
      alert('Deu ruim')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={ LogoImg } alt="Logo"/>

          <h1> Cadastrar Novo Caso </h1>

          <p> Descreva o caso detalhadamente para encontrar um herói para resolver isso. </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>

        <form
          onSubmit={addNewIncident}
        >
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Título do Caso"
          />

          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descrição"
          />

          <input
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Valor em reais"
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}
