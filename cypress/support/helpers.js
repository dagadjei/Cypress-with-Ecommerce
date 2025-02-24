export const parseResponse = (response) => {
    //if reponse is an object then return it as is
    if(typeof response.body === 'object'){
        return response.body
    }
    return JSON.parse(response.body)
}