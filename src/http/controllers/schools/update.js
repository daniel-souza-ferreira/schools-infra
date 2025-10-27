import { SequelizeSchoolsRepository } from '../../../repositories/sequelize/sequelize-schools-repository.js'
import { SequelizeDependenciesRepository } from '../../../repositories/sequelize/sequelize-dependencies-repository.js'
import { UpdateSchoolUseCase } from '../../use-cases/update-school-use-case.js'
import { getDependenciesEnumValues } from '../../../utils/get-dependencies-enum-values.js'

export async function update(req, res) {
    const updateSchoolParamsSchema = z.object({
        id: z.uuid()
    })
    const { id } = updateSchoolParamsSchema.parse(req.params)

    const dependencyEnumValues = getDependenciesEnumValues()
    const updateSchoolBodySchema = z.object({
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
                quantidade: z.number().int().min(0),
                id: z.uuid()
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
    } = updateSchoolBodySchema.parse(req.body)

    // TODO separar em uma factory
    const schoolsRepository = new SequelizeSchoolsRepository()
    const dependenciesRepository = new SequelizeDependenciesRepository()
    const updateSchoolUseCase = new UpdateSchoolUseCase(schoolsRepository, dependenciesRepository)

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
            quantidade: data.quantidade,
            id: data.id,
            school_id: id
        }
    })

    await updateSchoolUseCase.execute(id, schoolPayload, dependenciesPayload)
    return res.status(200).send()
}