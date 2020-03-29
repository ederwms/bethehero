import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native'

import styles from './styles'
import Logo from '../../assets/logo.png'

import api from '../../services/api'

export default function Detail () {
  const navigation = useNavigation()
  const [incidents, setIncidents] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    refreshIncidents()
  }, [])

  function refreshIncidents () {
    setIsRefreshing(true)

    api.get(`/incidents`)
        .then((response) => {
          setIncidents(response.data)
          setTotal(response.headers['x-total-count'])
          setPage(2)
          setIsRefreshing(false)
        })
  }

  function loadIncidents () {
    if (isLoading) {
      return
    }

    if (total > 0 && incidents.length === total) {
      return
    } else {
      setIsLoading(true)

      api.get(`/incidents?page=${page}`)
        .then((response) => {
          setIncidents([...incidents, ...response.data])
          setTotal(response.headers['x-total-count'])
          setPage(page + 1)
          setIsLoading(false)
        })
    }
  }

  function navigateToDetail (incident) {
    navigation.navigate('Detail', { incident })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Logo} />

        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{ total } casos</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem Vindo!</Text>

      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

        <FlatList
          style={styles.incidentList}
          data={incidents}
          keyExtractor={incident => String(incident.id)}
          refreshing={isRefreshing}
          onRefresh={refreshIncidents}
          onEndReached={loadIncidents}
          onEndReachedThreshold={0.2}
          renderItem={({ item: incident }) => (
            <View style={styles.incident}>
              <Text style={styles.incidentProperty}>ONG:</Text>
              <Text style={styles.incidentValue}> { incident.name } </Text>

              <Text style={styles.incidentProperty}>Caso:</Text>
              <Text style={styles.incidentValue}> { incident.title } </Text>

              <Text style={styles.incidentProperty}>VALOR:</Text>
              <Text style={styles.incidentValue}>
                {
                  Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(incident.value)
                }
              </Text>

              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigateToDetail(incident)}
              >
                <Text style={styles.detailsButtonText}>
                  Ver mais detalhes
                </Text>

                <Feather name="arrow-right" size={16} color="#e02041" />
              </TouchableOpacity>
            </View>
          )}
        />
    </View>
  )
}
