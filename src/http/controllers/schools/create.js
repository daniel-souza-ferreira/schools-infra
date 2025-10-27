import { SequelizeSchoolsRepository } from '../../../repositories/sequelize/sequelize-schools-repository.js'
import { SequelizeDependenciesRepository } from '../../../repositories/sequelize/sequelize-dependencies-repository.js'
import { CreateSchoolUseCase } from '../../use-cases/create-school-use-case.js'
import { z } from 'zod'
import { getDependenciesEnumValues } from '../../../utils/get-dependencies-enum-values.js'

export async function create(req, res) {
    const dependencyEnumValues = getDependenciesEnumValues()
    const createSchoolBodySchema = z.object({
        nomedep: z.string(),
        de: z.string(),
        mun: z.string(),
        distr: z.string(),
        codesc: z.string(),
        nomesc: z.string(),
        tipoesc: z.number().int(),
        tipoesc_desc: z.string(),
        codsit: z.string(),
        dependencias: z.array(
            z.object({
                nome: z.enum(dependencyEnumValues),
                quantidade: z.number().int().min(0)
            })
        )
    })

    const { 
        nomedep, 
        de, 
        mun, 
        distr, 
        codesc, 
        nomesc, 
        tipoesc, 
        tipoesc_desc, 
        codsit, 
        dependencias 
    } = createSchoolBodySchema.parse(req.body)

    // TODO separar em uma factory
    const schoolsRepository = new SequelizeSchoolsRepository()
    const dependenciesRepository = new SequelizeDependenciesRepository()
    const createSchoolUseCase = new CreateSchoolUseCase(schoolsRepository, dependenciesRepository)

    const schoolPayload = {
        nomedep, 
        de, 
        mun, 
        distr, 
        codesc, 
        nomesc, 
        tipoesc, 
        tipoesc_desc, 
        codsit
    }
    const dependenciesPayload = dependencias.map(data => {
        return {
            nome: data.nome,
            quantidade: data.quantidade
        }
    })

    const { school } = await createSchoolUseCase.execute(schoolPayload, dependenciesPayload)

    return res.status(201).json(school)
}