import { useState } from 'react'
export default function merge() {
    const _a = JSON.parse(``)
    const a = _a.state.answers
    a.shift()
    a.shift()
    a.shift()
    const _b = JSON.parse(``)
    const b = _b.state.entries
    const _c = JSON.parse(``)
    const c = _c.state.entries

    const [hidden, setHidden] = useState([])

    const merged = c.map((e,i) => ({
        ...e,
        association: [a[i].a, b[i].association, e.association],
        time: [a[i].t, b[i].time, e.time],
    }))

    const roundTo = (number, precision = 0) => {
        const power = Math.pow(10, precision);
        return Math.ceil((number || 0) * power) / power;
    };

    const hide = (i:number) => {
        setHidden([...hidden, i])
    }

    return merged.map((e,i) => <div key={i} style={{display: hidden.includes(i) ? 'none' : 'block', textAlign:'left', borderBottom:'1px solid',padding:'10px 0'}}>
        <span style={{width: '20px', display:'inline-block', marginRight:'20px'}}><div style={{cursor:'pointer', border: '1px solid', textAlign:'center'}} onClick={() => hide(i)}>X</div></span> 
        <span style={{width: '200px', display:'inline-block'}}>{e.word}</span> 
        <span style={{width: '200px', display:'inline-block'}}>{e.association[2]}</span>
        <span style={{width: '50px', display:'inline-block'}}>{roundTo(e.time[2], 2)}</span>
        <span style={{width: '200px', display:'inline-block'}}>{e.association[1]}</span>
        <span style={{width: '50px', display:'inline-block'}}>{roundTo(e.time[1], 2)}</span>
        <span style={{width: '200px', display:'inline-block'}}>{e.association[0]}</span>
        <span style={{width: '50px', display:'inline-block'}}>{roundTo(e.time[0], 2)}</span>
        
    </div>)
}