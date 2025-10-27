import { expect, it, describe, beforeEach } from "vitest";
import { InMemorySchoolsRepository } from '../../../repositories/in-memory/in-memory-schools-repository.js'
import { GetSchoolUseCase } from '../get-school-use-case.js'

let schoolsRepository
let sut

describe('Get school use case', () => {
    beforeEach(() => {
        schoolsRepository = new InMemorySchoolsRepository()
        sut = new GetSchoolUseCase(schoolsRepository)
    })

    it('should be able to get a created school', async () => {
        const createdSchool = await schoolsRepository.create({
            "NOMEDEP": "ESTADUAL - SE",
            "DE": "ADAMANTINA",
            "MUN": "ADAMANTINA",
            "DISTR": "ADAMANTINA",
            "CODESC": 31045
        })
        const { school } = await sut.execute(createdSchool.id)

        expect(school.id).toEqual(expect.any(String))
    })

    it('should not be able to get an unexistent school', async () => {
        const { school } = await sut.execute('any id')
        expect(school).not.toBeTruthy()
    })
})