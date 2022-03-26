import React,{useEffect, useState} from 'react'
import './App.css';
import Item from "./item";
import Total from "./Total"


function App() {

  const [cart, setcart]= useState([]);
  //fetch edeceğim tüm bilgileri buraya tanımlamasını sağlayacağız
  let amount =0;
  let itemcount=0;

  useEffect(async()=>{
    let data =await fetch("https://fakestoreapi.com/products?limit=6");
    let result =await data.json();//gelen verileri bana jsondan çek demek bu
    setcart(result); //map etmek için buraya tanımlıyoruz
    getitems();
  },[]);


  return (
   <>
    <h1 className='mycart'>
      Sepetim <p>{cart.length}</p>
      {/* <h4>ürün</h4> */}
    </h1>
    <div className='main'>
      <div className='itemslist'>
      {
        cart.map((item) => (
        <Item
          key={item.id}
          itemid={item.id}
          image={item.image}
          title={item.title}
          category = {item.category}
          price={item.price}
        />
       ))}
      </div>
    

    {
      (cart.forEach((item) => (amount=amount+item.price)),
      (<Total totalprice={amount.toFixed(2)}/>)
      //toFix virgülden sonraki rakam olarak sadece iki rakam al için kullanıyoruz
      )

      }
    </div> 
  </>
  );
  
  function getitems()
  {
  let cartitems =  document.querySelectorAll(".Cartitem");
  cartitems.forEach((item,index)=>{
    itemcount=cartitems.length;
    item.querySelector(".delete").classList.add("visible");
   

    item.addEventListener("click",(e)=> {
      console.log("text target = "+e.target.textContent);

    //   if(e.target.textContent == " SİL "){
    //     console.log("productPrice"+item.querySelector(".details h2").textContent);
    //     let productprice = item.querySelector(".details h2").textContent;
    //     let tprice = Math.max(document.querySelector(".checkout h4").textContent);
    //     document.querySelector(".checkout h4").textContent = Math.max(tprice-productprice*1).toFixed(2);
    //     document.querySelector(".orderamount").textContent = 
    //     document.querySelector(".checkout h4").textContent + "TL";
    //       //animasyon ekleyeceğiz şimdi
    //     cartitems.item(index).style.animation ="removeanimation 0.5s ease";
    //       cartitems.item(index).addEventListener("animationend" , ()=>{
    //         cartitems.item(index).remove();
    //         itemcount--;
    //         document.querySelector(".mycart p").textContent = itemcount;
    //   });
    // }
     
       switch(e.target.textContent){
         case "+":
           {
             let count= item.querySelector(".amount").textContent;
             let productprice = item.querySelector(".details h2").textContent;
             count++;
             if(count>1)
             {
               item.querySelector(".delete").classList.remove("visible");

             }

             item.querySelector(".amount").textContent=count;
             item.querySelector(".details h5").textContent=(productprice*count).toFixed(2)+"TL";
             let tprice= Math.max(document.querySelector(".checkout h4").textContent);
             let cargofreeprice = tprice + productprice * count;
             if(cargofreeprice>500){
               document.querySelector(".freeshipping").classList.add("visible");
               document.querySelector(".cargoamountTL").classList.add("cargopricedelete");

             }
             else
             {
               document.querySelector(".freeshipping").classList.remove("visible");
               document.querySelector(".cargoamountTL").classList.remove("cargopricedelete");

             }

             document.querySelector(".checkout h4").textContent=Math.fround(tprice+productprice*1).toFixed(2);
             document.querySelector(".orderamount").textContent=document.querySelector("checkout h4").textContent+ "TL";
             break;
           }
         case "-":
             {
               let count= item.querySelector(".amount").textContent;
               if(count !=1 )
               {
                 let productprice = item.querySelector(".details h2").textContent;
                 count--;

            
            
               if(count < 2 )
               {
                 item.querySelector(".delete").classList.remove("visible");

               }

            
               item.querySelector(".details h5").textContent=(productprice*count).toFixed(2)+"TL";
               let tprice= Math.max(document.querySelector(".checkout h4").textContent);
               let cargofreeprice = tprice - productprice * count;

               if(cargofreeprice > 500){
                 document.querySelector(".freeshipping").classList.add("visible");
                 document.querySelector(".cargoamountTL").classList.add("cargopricedelete");

               }
               else
               {
               document.querySelector(".freeshipping").classList.remove("visible");
               document.querySelector(".cargoamountTL").classList.remove("cargopricedelete");

             }

             document.querySelector(".checkout h4").textContent=Math.fround(tprice - productprice * 1).toFixed(2);
           }
             item.querySelector(".amount").textContent=count;
             document.querySelector(".orderamount").textContent=document.querySelector("checkout h4").textContent+ "TL";
             break;
         
         
           }
         case "SİL":
             {
               console.log("productPrice"+item.querySelector(".details h2").textContent);
               let productprice = item.querySelector(".details h2").textContent;
               let tprice = Math.max(document.querySelector(".checkout h4").textContent);
               document.querySelector(".checkout h4").textContent = Math.max(tprice-productprice*1).toFixed(2);
               document.querySelector(".orderamount").textContent = 
                   document.querySelector(".checkout h4").textContent + "TL";
                 //animasyon ekleyeceğiz şimdi
                 cartitems.item(index).style.animation ="removeanimation 0.5s ease";
                 cartitems.item(index).addEventListener("animationend" , ()=>{
                   cartitems.item(index).remove();
                   itemcount--;
                   document.querySelector(".mycart p").textContent = itemcount;

                 });
               break;
             }
       }
      
     });

     });
  }
}




export default App;
