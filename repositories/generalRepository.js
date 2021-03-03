
var dateFormat = require("dateformat");
let generalRepository = {
    isQueryStringExists : (queries,string)=>{
        let queriesArray = Object.keys(queries)
        if (queriesArray.includes(string)){
            return true
        }

        return false
    },

    isPayloadExists : (queries,string)=>{
        let queriesArray = Object.keys(queries)
        if (queriesArray.includes(string)){
            return true
        }

        return false
    },

    formatDate: (date) =>{
        return dateFormat(date,'yyyy-mm-dd')
    }


}

module.exports = generalRepository