import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import axios from 'axios'
import Const from '../../../helpers/const'

import { FiArrowLeft } from 'react-icons/fi'

import LogoImg from '../../../assets/logo.svg'

import './styles.css'

export default function Register () {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [city, setCity] = useState('')
  const [uf, setUf] = useState('')
  const history = useHistory()

  async function handleRegister (e) {
    e.preventDefault()

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    }

    try {
      const response = await axios.post(`${Const.API_ONG}`, data)

      alert(`Seu ID de acesso: ${response.data.id}`)
      history.push('/')
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={ LogoImg } alt="Logo"/>

          <h1> Cadastro </h1>

          <p> Faça seu cadastro, ajude pessoas a encontrarem os casos da sua ONG. </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para o logon
          </Link>
        </section>

        <form
          onSubmit={handleRegister}
        >
          <input
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />

            <input
              placeholder="UF"
              value={uf}
              onChange={e => setUf(e.target.value)}
              style={{ width: 80 }}
            />
          </div>

          <button
            className="button"
            type="submit"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}