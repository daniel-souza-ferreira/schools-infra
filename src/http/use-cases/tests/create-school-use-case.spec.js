import { expect, it, describe, beforeEach } from "vitest";
import { InMemorySchoolsRepository } from '../../../repositories/in-memory/in-memory-schools-repository.js'
import { CreateSchoolUseCase } from '../create-school-use-case.js'

let schoolsRepository
let sut

describe('Create school use case', () => {
    beforeEach(() => {
        schoolsRepository = new InMemorySchoolsRepository()
        sut = new CreateSchoolUseCase(schoolsRepository)
    })

    it('should be able to create a school', async () => {
        const { school } = await sut.execute({
            "NOMEDEP": "ESTADUAL - SE",
            "DE": "ADAMANTINA",
            "MUN": "ADAMANTINA",
            "DISTR": "ADAMANTINA",
            "CODESC": 31045
        })

        expect(school.id).toEqual(expect.any(String))
    })
})