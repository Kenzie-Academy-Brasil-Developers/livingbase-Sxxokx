

export  async function getPage(nPage){

    let request = await fetch(`https://m2-api-living.herokuapp.com/news?page=${nPage}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })

    let response = await request.json()

    return response

}