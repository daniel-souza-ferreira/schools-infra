export function formatCsvContent(csvLinesList) {
    const schoolStringFields = [
        "NOMEDEP",
        "DE",
        "MUN",
        "DISTR",
        "CODESC",
        "NOMESC",
        "TIPOESC_DESC",
        "CODSIT"
    ]
    const schoolIntegerFieds = [
        "TIPOESC"
    ]

    return csvLinesList.map(lineData => {
        const result = {
            dependencias: []
        };
        Object.keys(lineData).forEach(key => {
            if (schoolStringFields.includes(key)) {
                result[key.toLowerCase()] = lineData[key]
            
            } else if (schoolIntegerFieds.includes(key)) {
                result[key.toLowerCase()] = parseInt(lineData[key])

            } else {
                result.dependencias.push({
                    nome: key.toLowerCase(),
                    quantidade: parseInt(lineData[key])
                })
            }
        })

        return result;
    });
}