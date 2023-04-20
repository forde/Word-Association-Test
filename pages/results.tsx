import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { resultStore } from '../store'

export const roundTo = (number, precision = 0) => {
    const power = Math.pow(10, precision);
    return Math.ceil((number || 0) * power) / power;
};

export const percentOf = (x, y) => Math.ceil((x / (y || 1)) * 100);

export default function results() {

    const storedEntries = resultStore((state:any) => state.entries)
    const removeEntries = resultStore((state:any) => state.removeEntries)

    const [entries, setEntries] = useState([])

    const { push:goTo, query } = useRouter()

    useEffect(() => {
        setEntries(storedEntries)
    }, [])

    useEffect(() => {
        if(query.key) {
            const res = localStorage.getItem(`results-${query.key}`)
            console.log(res)
        }
    }, [query.key])

    const removeResults = () => {
        console.log(removeEntries)
        goTo('/')
    }

    //if(entries[6]) entries[6].time = 40.56

    const [minVal, maxVal] = ((entries) => {
        const sorted = entries.map((v) => v.time).sort((a, b) => a - b);
        return [sorted[0], sorted[entries.length-1]];
    })(entries);

    const max = maxVal > 10 ? maxVal : 10

    return (
        <>
            <div className="entries">
                {entries
                .sort((a, b) => a.time - b.time).reverse()
                .map((e:any) => (
                    <div key={e.word}>
                        <div style={{
                            width: percentOf(e.time, max)+'%'
                        }}>

                            {roundTo(e.time, 2)} s.
                        </div>
                        <strong>{e.word} - {e.association}</strong>
                    </div>
                ))}
            </div>
            <button className="mb-20" onClick={removeResults}>Remove this results</button>
        </>
    )
}