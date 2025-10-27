import { SequelizeSchoolsRepository } from '../../../repositories/sequelize/sequelize-schools-repository.js'
import { SequelizeDependenciesRepository } from '../../../repositories/sequelize/sequelize-dependencies-repository.js'
import { GetSchoolUseCase } from '../../use-cases/get-school-use-case.js'
import { z } from 'zod'

export async function getInfo(req, res) {
    const getSchoolBodySchema = z.object({
        id: z.uuid()
    })
    const { id } = getSchoolBodySchema.parse(req.params)

    const schoolsRepository = new SequelizeSchoolsRepository()
    const dependenciesRepository = new SequelizeDependenciesRepository()
    const getSchoolUseCase = new GetSchoolUseCase(schoolsRepository, dependenciesRepository)

    const result = await getSchoolUseCase.execute(id);

    return res.status(200).json(result)
}