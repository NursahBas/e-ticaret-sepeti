import React from 'react'
import "./total.css"

/* YAN KISMI BURDA YAPIYORUZ ÖDEME KISMINI*/
function Total({totalprice}) {
  return (
    <div className='checkout'> 
       <h1>ÖDENECEK TUTAR</h1>
       <div className='money'>
           <h4>{totalprice}</h4>
           <p>TL</p>
       </div>
       <button> Alışverişi Tamamla</button>
       <p className='description'>lorem3</p>
       <div className='cargo'>
           <div className='cargoamount'>
               <p>Kargo</p>
               <p className='freeshipping'>Bedava</p>
               <p className='cargoamountTL'>12 TL </p>
           </div>
           <div className='orderTotal'>
               <p>Ürünler</p>
               <p className='orderamount'>{totalprice}TL</p>
           </div>
       </div>
    </div>
  )
}

export default Total