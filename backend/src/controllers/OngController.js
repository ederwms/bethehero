const connection = require('../database/connection')
const crypto = require('crypto')

module.exports = {
  async index(_, response) {
    const ongs = await connection('ongs').select('*')

    return response.status(200).json(ongs)
  },
  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body

    // const repeatOng = await connection('ongs').where('name', '=', name).select('*').first()

      if (await connection('ongs').where('name', '=', name).select('*').first()) {
        const result = {
          message: 'Já existe uma ONG cadastrada com esse nome',
        }

        return response.status(200).json(result)
      }

    const id = crypto.randomBytes(4).toString('HEX')

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    })

    const result = {
      message: 'ONG cadastrada com sucesso.',
      id
    }

    return response.status(200).json(result)
  }
}