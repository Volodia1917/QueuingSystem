import { error } from "console"
import { resolve } from "path"

export const getLogin = async (url:string, userName: string, password:string) => {
    return new Promise((resolve:any)=>{
        fetch(url, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({email: userName, password: password, role:'Admin'})
        }).then(response=>response.json())
        .then(data=>resolve(data))
        .catch(errors=>resolve('No network connection'))
    })
}