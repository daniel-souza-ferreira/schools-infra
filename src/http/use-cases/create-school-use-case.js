
export class CreateSchoolUseCase {
    constructor(schoolsRepository, dependenciesRepository) {
        this.schoolsRepository = schoolsRepository
        this.dependenciesRepository = dependenciesRepository
    }

    async execute(data, dependencies) {
        const school = await this.schoolsRepository.create(data)
        const dependenciesResult = []

        for (const dependencyData of dependencies) {
            const result = await this.dependenciesRepository.create({
                ...dependencyData,
                school_id: school.id
            })
            dependenciesResult.push(result)
        }

        return {
            school: {
                ...school,
                dependencies: dependenciesResult
            }
        }
    }
}