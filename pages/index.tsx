import { useRouter } from 'next/router'
import { resultStore } from '../store'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function index() {

    const { push:goTo } = useRouter()

    const storedEntries = resultStore((state:any) => state.entries)

    const [entries, setEntries] = useState([])
    const [lang, setLang] = useState('en')

    useEffect(() => {
        setEntries(storedEntries)
    }, [])

    return (
        <>
            <h1 className="mb-20">Word Association Test</h1>
            <p className="mb-20">You will be presented with 100 words, one at a time.<br/>Once you see a word write first thing that comes to your mind & press <strong>Enter</strong></p>
            <select className="mb-20" onChange={e => setLang(e.target.value)} value={lang}>
                <option value="en">Engish</option>
                <option value="pl">Polish</option>
            </select>
            <button onClick={() => goTo(`/test?lang=${lang}`)}>Start</button>
            {!!entries.length && <Link href="/results" style={{marginTop:'20px'}}>See previous results</Link>}
        </>
    )
}