/* Desenvolva seu script aqui */

import { getById } from "../../api/getById.js"
import { getPage } from "../../api/getByPage.js"

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

function generateCategory(arr){
    
    let lista = document.querySelector(".lista")

    arr.forEach(element =>{

        let liProducts =document.createElement("li")
        let linkProducts = document.createElement("a")

        liProducts.classList.add("liProducts")
        linkProducts.classList = "linkProducts font4Semibold"

        linkProducts.innerText=element
        
        linkProducts.addEventListener("click",async ()=>{

            localStorage.setItem("@nameOfCategory",JSON.stringify(liProducts.innerText))

            window.location.assign("../home/index.html")

        })

    
        lista.appendChild(liProducts)
        liProducts.appendChild(linkProducts)

    })

}generateCategory( await getCategorys());

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

async function renderContentPage(){
   let objId=JSON.parse( localStorage.getItem("@objectPost"))
   let res =await getById(objId)

   let h2Content = document.querySelector(".h2Content")
   let decContent = document.querySelector(".decContent")
   let imgPagePost = document.querySelector(".imgPagePost")
   let pContent = document.querySelector(".pContent")

   h2Content.innerText = res.title
   decContent.innerText = res.description
   imgPagePost.src = res.image
   pContent.innerText = res.content
}

renderContentPage()
