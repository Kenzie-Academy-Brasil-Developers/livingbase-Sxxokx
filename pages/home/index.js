/* Desenvolva seu script aqui */

import { getPage } from "../../api/getByPage.js";

let numberPages = 0


function renderCards(arr) {

    let cards = document.querySelector(".cards")

    arr.forEach(element => {
        let card = document.createElement("div")
        let imgPostCard = document.createElement("img")
        let divContentCard = document.createElement("div")
        let h3Card = document.createElement("h3")
        let pCard = document.createElement("p")
        let aCard = document.createElement("a")

        card.classList.add("card")
        imgPostCard.classList.add("imgPostCard")
        divContentCard.classList.add("divContentCard")
        h3Card.classList = "font3Semibold spaceTop2"
        pCard.classList = "font4Regular spaceTop1"
        aCard.classList = "font4Semibold textGreen spaceTop1"


        imgPostCard.src = element.image
        h3Card.innerText = element.title
        pCard.innerText = element.description
        aCard.innerText = "acessar"

        aCard.addEventListener("click", () => {
            let elemJson = JSON.stringify(element.id)
            localStorage.setItem("@objectPost",elemJson)
            window.location.assign("../post/index.html")

        })

        cards.appendChild(card)
        card.append(imgPostCard, divContentCard)
        divContentCard.append(h3Card, pCard, aCard)

    });
}

async function getCategorys() {

    let contador = 0
    
    let arr = []
    let cont2 = 6

    for (let i = 0; i < cont2; i += 6) {
        let pages2 = await getPage(contador)
        contador++
        cont2 =pages2.count
        pages2.news.forEach(element => {
            if (!arr.includes(element.category)) {
                arr.push(element.category)

            }

        })
    }

    return arr

}

function renderAll(){

    let todos = document.querySelector(".todos")
    todos.addEventListener("click",()=>{
        let cards = document.querySelector(".cards")

        cards.innerHTML=""

        observer()
    })
   
}renderAll()


function generateCategory(arr){
    
    let lista = document.querySelector(".lista")


    arr.forEach(element =>{

        let liProducts =document.createElement("li")
        let linkProducts = document.createElement("a")

        liProducts.classList.add("liProducts")
        linkProducts.classList = "linkProducts font4Semibold"

        linkProducts.innerText=element
        linkProducts.classList.add(element)
        
        linkProducts.addEventListener("click",async ()=>{

            if(document.querySelector(".observer")){
            let divObserver =document.querySelector(".observer")
            divObserver.remove()
            }
            let contador = 0
            let arr =[]
            let cont3 = 6
        
            for (let i = 0; i < cont3; i += 6) {
                let pages3 = await getPage(contador)
                contador++
                cont3 =pages3.count
                pages3.news.forEach(element => {
                    arr.push(element)
                })
            }
             
           let arrayRes = arr.filter(element => {
                return element.category == liProducts.innerText
            })

                
            let cards = document.querySelector(".cards")

            cards.innerHTML=""

            console.log(cards)
            renderCards(arrayRes)

        })

    
        lista.appendChild(liProducts)
        liProducts.appendChild(linkProducts)

    })

}generateCategory( await getCategorys())


function buttonScroll(){
    let buttonNext = document.querySelector(".buttonNext")
    let buttonReturn = document.querySelector(".buttonReturn")

    let li = document.querySelector(".lista")

    
    buttonNext.addEventListener("click",()=>{
        li.scroll(10000,0)

        buttonReturn.classList.toggle("displayNone")
        buttonNext.classList.toggle("displayNone")
    })
    buttonReturn.addEventListener("click",()=>{
        li.scroll(0,0)

        buttonReturn.classList.toggle("displayNone")
        buttonNext.classList.toggle("displayNone")
    })


}buttonScroll()


 function observer() {

    numberPages =0
        let divObser = document.querySelector(".obser")
    
        let divObserver = document.createElement("div")
    
        divObserver.classList.add("observer")
    
        divObser.appendChild(divObserver)


       if( divObser.children.length > 1){
        divObserver.remove()
       }

       console.log(divObser.children.length)

       
    let Observer = new IntersectionObserver(async (entry) => {

        if (entry.some((entry) => entry.isIntersecting)) {

            let pages = await getPage(numberPages++)

            renderCards(pages.news)

        }
    })
    Observer.observe(divObserver)

} 

function clickInCategory(){

    if(localStorage.getItem("@nameOfCategory")){

        let res =JSON.parse( localStorage.getItem("@nameOfCategory"))
        document.querySelector(`.${res}`).click()

        localStorage.removeItem("@nameOfCategory")


    }else{
        document.querySelector(".todos").click()
    }
    
} clickInCategory()