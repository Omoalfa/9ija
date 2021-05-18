import './app.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import data from './data'

const App = () => {
    const [games, setGames] = useState(data)
    const [value, setValue] = useState('')
    const [level, setLevel] = useState('')
    const [academic, setAcademic] = useState(false)
    const [financial, setFinancial] = useState(false)
    // const [loading, setLoading] = useState(true)

    // useEffect(async () => {
    //     try {
            // const instance = axios.create({
            //     headers: {
            //         "Access-Control-Allow-Origin": "https://partners.9ijakids.com"
            //     }
            // })
    //         const result = await axios.get(
    //             'https://partners.9ijakids.com/index.php?partnerId=555776&accessToken=l0lawtvv-94bv-oi4d-u808-5ubz&action=catalogfilter', {
    //             crossDomain: true
    //         })
    //         console.log(result)
    //         setData(result)
    //         setLoading(false)
    //     } catch (error) {
    //         console.log(error)
    //         setLoading(false)
    //     }
    // }, [])

    const searchTitle = (e) => {
        // e.preventDefault()
        const result = data.filter(game => {
            const { GameTitle } = game
            const title = GameTitle.toLowerCase()
            const valid = title.includes(value)
            return valid
        })
        console.log(value)
        console.log(result)
        setGames(result)
    }

    const filter = (e) => {
        e.preventDefault()
        console.log({level, academic, financial})
        const result = data.filter(game => (
            game.Level.includes(level) ||
            game.Group.toLowerCase().includes(academic ? 'academic' : 'never') ||
            game.Group.toLocaleLowerCase().includes(financial ? 'financial' : 'never')
        ))

        setGames(result)
        console.log(games)
    }


    return (
        <div>
            <div className='header'>9ija Games List</div>
        <div className='logics'>
            <div className='search-box'>
                <input type="text" className="search" value={value} onChange={(e) => {
                    setValue(e.target.value)
                    searchTitle()
                }} />
                <button onClick={searchTitle}>search</button>
            </div>
            <div className="filter">
                <form onSubmit={(e) => filter(e)}>
                    <p>By Group</p>
                    <label htmlFor='academic'>Academic</label>
                    <input type='checkbox' checked={academic} onClick={(e) => setAcademic(e.target.checked)} name='academic' /> 
                    <label htmlFor='financial'>Financial Literacy</label>
                    <input type='checkbox' checked={financial} onClick={(e) => setFinancial(e.target.checked)} name='financial' /><br />
                    <label htmlFor='level'>Level</label>
                    <input type='range' name='level' value={level} onChange={(e) => setLevel(e.target.valueAsNumber)} min='1' max='2' />
                    <button type='submit'>filter</button>
                </form>
            </div>
            </div>
            <div className='content'>
                { games.map((game, key) => (
                    <div className='card'>
                        <img src={game.GameImage} alt={key} />
                        <div className='card-caption'>
                            <h3 className='card-title'>{ game.GameTitle }</h3>
                            <p className='card-discription'>{ game.GameDescription }</p>
                        </div>
                    </div>
                )) }
            </div>
        </div>
    )
}

export default App