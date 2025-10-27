
export class GetManySchoolsUseCase {
    constructor(schoolsRepository) {
        this.schoolsRepository = schoolsRepository
    }

    async execute(page) {
        const result = await this.schoolsRepository.getMany(page)

        return {
            result
        }
    }
}