import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import axios from 'axios'
import Const from '../../../helpers/const'

import { FiLogIn } from 'react-icons/fi'

import './styles.css'
import HeroesImg from '../../../assets/heroes.png'
import LogoImg from '../../../assets/logo.svg'

export default function Logon () {
  const [id, setId] = useState('')
  const history = useHistory()

  async function handleLogin (e) {
    e.preventDefault()

    try {
      const response = await axios.post(`${Const.API_SESSION}`, { id })

      localStorage.setItem('ong-id', id)
      localStorage.setItem('ong-name', response.data.name)

      history.push('/profile')
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={ LogoImg } alt="Logo"/>

        <form
          onSubmit={handleLogin}
        >
          <h1>
            Faça seu Logon
          </h1>

          <input
            value={id}
            onChange={e => setId(e.target.value)}
            placeholder="Sua ID"
          />

          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={ HeroesImg } alt="Heroes"/>
    </div>
  )
}