// Consonants and vowels
const consonants = 'bcdfghjklmnpqrstvwxyz'.split('')
const vowels = 'aeiou'.split('')

// wordGenerator.ts
export const getRandomConsonant = (): string =>
    consonants[Math.floor(Math.random() * consonants.length)]

export const getRandomVowel = (): string =>
    vowels[Math.floor(Math.random() * vowels.length)]

export const generateSyllable = (): string => {
    const syllablePatterns: (() => string)[] = [
        () => getRandomVowel(), // <vow>
        () => getRandomConsonant() + getRandomVowel(), // <con><vow>
        () =>
            getRandomConsonant() +
            getRandomVowel() +
            getRandomConsonant(), // <con><vow><con>
        () => getRandomVowel() + getRandomConsonant(), // <vow><con>
    ]
    const pattern =
        syllablePatterns[
            Math.floor(Math.random() * syllablePatterns.length)
        ]
    return pattern()
}

export const generateRandomWord = (): string => {
    const numSyllables = Math.floor(Math.random() * 2) + 2
    let word = ''
    for (let i = 0; i < numSyllables; i++) {
        word += generateSyllable()
    }
    return word
}

export const mutateWord = (
    word: string,
    mutationRate: number = 0.2
): string => {
    let newWord: string[] = word.split('')

    const totalMutations: number = Math.ceil(
        mutationRate * word.length
    ) // calculate number of letters to mutate

    let mutatedIndices: Set<number> = new Set() // track mutated indices

    for (let i = 0; i < totalMutations; i++) {
        let index: number

        do {
            index = Math.floor(Math.random() * newWord.length)
        } while (mutatedIndices.has(index))

        mutatedIndices.add(index) // add mutated indices to the set

        const currentLetter: string = newWord[index]
        let newLetter: string

        if (consonants.includes(currentLetter)) {
            do {
                newLetter = getRandomConsonant()
            } while (newLetter === currentLetter)
        } else if (vowels.includes(currentLetter)) {
            do {
                newLetter = getRandomVowel()
            } while (newLetter === currentLetter)
        } else {
            continue
        }

        newWord[index] = newLetter
    }

    return newWord.join('')
}
