import { SequelizeSchoolsRepository } from "../../../repositories/sequelize/sequelize-schools-repository.js"
import { GetManySchoolsUseCase } from "../../use-cases/get-many-schools-use-case.js";
import { z } from "zod";

export async function getMany(req, res) {
    const getManyBodySchema = z.object({
        page: z.number().int().min(1).default(1)
    })
    const { page } = getManyBodySchema.parse(req.body)

    const schoolsRepository = new SequelizeSchoolsRepository()
    const getManySchoolsUseCase = new GetManySchoolsUseCase(schoolsRepository)

    const { result } = await getManySchoolsUseCase.execute(page)
    res.status(200).json({
        page,
        result
    })
}