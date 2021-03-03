let requiredBodyRequest = {
    requiredPayload: ()=> {
        return {
            "status":"ERROR",
            "message" :"Payload must be exists"
        }
    },
    
    requiredAuth:()=> {
        return {
            "status":"ERROR",
            "message" :"Authentification must be exists"
        }
    }
    
}

module.exports = requiredBodyRequest