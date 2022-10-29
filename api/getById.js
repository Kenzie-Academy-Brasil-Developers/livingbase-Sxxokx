
export  async function getById(id){

    let request = await fetch(`https://m2-api-living.herokuapp.com/news/${id}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })

    let response = await request.json()

    return response

}