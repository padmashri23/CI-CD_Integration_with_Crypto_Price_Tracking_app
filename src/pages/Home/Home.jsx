import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'


export const Home = () => {
  
 

    const {allCoin,currency} =useContext(CoinContext);
    const [displayCoin, setDisplayCoin] = useState([]);
    const [input,setInput] = useState('');

    const inputHandler = (event) =>{
                   setInput(event.target.value);
        if(event.target.value === ''){
            setDisplayCoin(allCoin);

        }    
    }

    const searchHandler = async (event) => {
           event.preventDefault();
           const coins = await allCoin.filter((item) => {
            return item.name.toLowerCase().includes(input.toLowerCase())
    })
             setDisplayCoin(coins);
    }
    useEffect(()=> {
          setDisplayCoin(allCoin)
    },[allCoin]);










    return (

    <div className="home">
      <div className="hero">
        <h1>Largest <br/> Crypto Marketplace</h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace.
          Sign up to explore more about cryptos.
        </p>
        <form onSubmit = {searchHandler}>
          <input onChange={inputHandler} list='coinlist' value={input} type = "text" placeholder='Search crypto..' required/>

           <datalist id='coinlist'>
            {allCoin.map((item,index) => (<option key={index} value={item.name}/>))}

           </datalist>
        








          <button type="submit">Search</button>  
        </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{textAlign:"center"}}>24H Change</p>
          <p className='market-cap'>Market Cap</p>
          </div>
           {
           displayCoin.slice(0, 10).map((item, index) => (
            <Link to ={`/coin/${item.id}`} className="table-layout" key={item.id}>
              <p>{item.market_cap_rank}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src={item.image} alt={item.name} style={{ width: "20px" }} />
                <p>{item.name} - {item.symbol.toUpperCase()}</p>
              </div>
              <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
              <p style={{ color: item.price_change_percentage_24h >= 0 ? "lightgreen" : "red", textAlign: "center" }}>
                {item.price_change_percentage_24h.toFixed(2)}%
              </p>
              <p className="market-cap">{currency.symbol} {item.market_cap.toLocaleString()}</p>
            </Link>
            ))  
           }
  

          </div> 

    </div>
  )
}

export default Home
