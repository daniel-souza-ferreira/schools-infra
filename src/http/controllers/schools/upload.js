import { SequelizeSchoolsRepository } from "../../../repositories/sequelize/sequelize-schools-repository.js"
import { SequelizeDependenciesRepository } from "../../../repositories/sequelize/sequelize-dependencies-repository.js"
import { CreateSchoolUseCase } from "../../use-cases/create-school-use-case.js"
import { processCsvFile } from "../../../utils/process-csv-file.js"
import { formatCsvContent } from '../../../utils/format-csv-content.js'
import { unlink } from 'fs/promises'
import { getDependenciesEnumValues } from '../../../utils/get-dependencies-enum-values.js'
import { z } from "zod";

export async function upload(req, res) {
    const { file } = req;
    try {
        const uploadFileSchema = z.object({
            file: z.object({
                mimetype: z.enum(['text/csv'])
            })
        })
        uploadFileSchema.parse(req)
    
        const schoolsData = await processCsvFile(file.path)
        const formatedSchoolsData = formatCsvContent(schoolsData)

        const dependencyEnumValues = getDependenciesEnumValues()
        const createSchoolListBodySchema = z.array(
            z.object({
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
        )
        createSchoolListBodySchema.parse(formatedSchoolsData)
    
        const schoolsRepository = new SequelizeSchoolsRepository()
        const dependenciesRepository = new SequelizeDependenciesRepository()
        const createManySchoolsUseCase = new CreateSchoolUseCase(schoolsRepository, dependenciesRepository)

        formatedSchoolsData.forEach(async data => {
            const dependenciesData = data.dependencias
            delete data.dependencias

            await createManySchoolsUseCase.execute(data, dependenciesData)
        })
    
        await unlink(file.path)
        return res.status(201).send()
    } catch (error) {
        if (file) {
            await unlink(file.path)
        }

        throw error
    }
}