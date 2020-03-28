import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import { custAxios } from '../../../services/api'
import Const from '../../../helpers/const'

import './styles.css'
import LogoImg from '../../../assets/logo.svg'

export default function Profile () {
  const [incidents, setIncidents] = useState([])

  const ongName = localStorage.getItem('ong-name')
  const history = useHistory()

  useEffect(() => {
    custAxios().get(`${Const.API_PROFILE}`, )
      .then((response) => {
        setIncidents(response.data)
      })
  }, [])

  async function handleDeleteIncident (id) {
    try {
      custAxios().delete(`${Const.API_INCIDENT}/${id}`)
        .then(() => {
          setIncidents(
            incidents.filter((val) => {
              return val.id !== id
            })
          )
        })
    } catch (err) {
      alert(err.message)
    }
  }

  function logout () {
    localStorage.clear()

    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={ LogoImg } alt="Logo"/>

        <span> Bem vinda, { ongName } </span>

        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>

        <button
          onClick={logout}
          type="button"
        >
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>
        Casos Cadastrados
      </h1>

      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong> Caso </strong>
            <p> { incident.title } </p>

            <strong> Descrição </strong>
            <p> { incident.description } </p>

            <strong> Valor </strong>
            <p>
              {
                Intl.NumberFormat('pt-br', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(incident.value)
              }
            </p>

            <button
              onClick={() => handleDeleteIncident(incident.id)}
              type="button"
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
