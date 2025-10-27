import { expect, it, describe, beforeEach } from "vitest";
import { InMemorySchoolsRepository } from '../../../repositories/in-memory/in-memory-schools-repository.js'
import { DeleteSchoolUseCase } from '../delete-school-use-case.js'

let schoolsRepository
let sut

describe('Delete school use case', () => {
    beforeEach(() => {
        schoolsRepository = new InMemorySchoolsRepository()
        sut = new DeleteSchoolUseCase(schoolsRepository)
    })

    it('should be able to delete a created school', async () => {
        const school = await schoolsRepository.create({
            "NOMEDEP": "ESTADUAL - SE",
            "DE": "ADAMANTINA",
            "MUN": "ADAMANTINA",
            "DISTR": "ADAMANTINA",
            "CODESC": 31045
        })

        const { result } = await sut.execute(school.id)

        expect(result).not.toBe(null)
    })

    it('should not be able to delete an unexistent school', async () => {
        const { result } = await sut.execute('randomId')
        expect(result).toBe(null)
    })
})