import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import { resultStore } from '../store'

import wordsPL from '../words/pl'
import wordsEN from '../words/en'

interface Answer {
    word: string
    association: string
    time: number
}

export default function test() {

    const storeEntries = resultStore((state:any) => state.storeEntries)

    const [index, setIndex] = useState<number>(0)
    const [association, setAssociation] = useState<string>('')
    const [results, setResults] = useState<Answer[]>([])
    const [timeStart, setTimeStart] = useState<number>()
    const [timeEnd, setTimeEnd] = useState<number>()

    const { push:goTo, query } = useRouter()

    const words = query.lang === 'pl' ? wordsPL : wordsEN

    const word = words[index]

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef?.current?.focus()
        setTimeStart(performance.now())
    }, [])

    const onChange = (e:any) => {
        setAssociation(e.target.value)
    }

    const onKeyDown = (e:any) => {
        if(association === '' && e.key === 'Enter') return

        if(association === '') {
            setTimeEnd(performance.now())
        }

        if(e.key === 'Enter') {
            const entry = {
                word: word,
                association: association,
                time: (timeEnd-timeStart)/1000
            }
            setResults([...results, entry])

            if(words[index+1]) {
                setIndex(index+1)
                setAssociation('')
                setTimeStart(performance.now())
            } else {
                storeEntries([...results, entry])
                goTo('/results')
            }
        }
    }

    return (
        <>
            <h1 className="mb-40">{word}</h1>
            <input
                ref={inputRef}
                value={association}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
        </>
    )
}