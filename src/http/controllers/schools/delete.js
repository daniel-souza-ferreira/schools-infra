import { SequelizeSchoolsRepository } from '../../../repositories/sequelize/sequelize-schools-repository.js'
import { DeleteSchoolUseCase } from '../../use-cases/delete-school-use-case.js'
import { z } from 'zod'

export async function deleteOne(req, res) {
    const deleteSchoolBodySchema = z.object({
        id: z.uuid()
    })
    const { id } = deleteSchoolBodySchema.parse(req.params)

    const schoolsRepository = new SequelizeSchoolsRepository()
    const deleteSchoolUseCase = new DeleteSchoolUseCase(schoolsRepository)

    await deleteSchoolUseCase.execute(id)

    return res.status(204).send()
}