const connection = require('../database/connection')

module.exports = {
	async create(request, response) {
		const { id } = request.body

		const ong = await connection('ongs')
			.where('id', id)
			.select('name')
			.first()

		if (!ong) {
			return response.status(404).json({
        error: 'No ONG found with this ID',
        message: 'Nenhuma ONG encontrada com este ID'
      })
    }

		return response.status(200).json(ong)
	}
}