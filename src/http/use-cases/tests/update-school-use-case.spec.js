import { expect, it, describe, beforeEach } from "vitest";
import { InMemorySchoolsRepository } from '../../../repositories/in-memory/in-memory-schools-repository.js'
import { UpdateSchoolUseCase } from '../update-school-use-case.js'

let schoolsRepository
let sut

describe('Get school use case', () => {
    beforeEach(() => {
        schoolsRepository = new InMemorySchoolsRepository()
        sut = new UpdateSchoolUseCase(schoolsRepository)
    })

    it('should be able to update a created school', async () => {
        const createdSchool = await schoolsRepository.create({
            "NOMEDEP": "ESTADUAL - SE",
            "DE": "ADAMANTINA",
            "MUN": "ADAMANTINA",
            "DISTR": "ADAMANTINA",
            "CODESC": 31045
        })

        const updatePayload = {
            "NOMEDEP": "SAO PAULO",
            "DE": "SAO PAULO",
            "MUN": "SAO PAULO",
            "DISTR": "SAO PAULO",
            "CODESC": 31045
        }
        const { school } = await sut.execute(createdSchool.id, updatePayload)

        expect(school.id).toBe(createdSchool.id)
        expect(school).toEqual(updatePayload)
    })

    it('should not be able to update a school with wrong id', async () => {
        const createdSchool = await schoolsRepository.create({
            "NOMEDEP": "ESTADUAL - SE",
            "DE": "ADAMANTINA",
            "MUN": "ADAMANTINA",
            "DISTR": "ADAMANTINA",
            "CODESC": 31045
        })

        const updatePayload = {
            "NOMEDEP": "SAO PAULO",
            "DE": "SAO PAULO",
            "MUN": "SAO PAULO",
            "DISTR": "SAO PAULO",
            "CODESC": 31045
        }
        const { school } = await sut.execute('wrong id', updatePayload)
        expect(school).not.toEqual(createdSchool)
    })
})