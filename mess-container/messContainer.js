const fs = require('fs');
class Messages{
    constructor(path){  
        this.path = path;
    }
    getAll(){ 
            let datos = fs.readFileSync(this.path, 'utf-8')
            if(datos.length > 0){
                let jsonDatos = JSON.parse(datos);  
                return jsonDatos;
            }else{
                return []
            }
    }
    save(obj){
        let objs = this.getAll();
        if(objs.length !== 0){
            let data = [...objs, {...obj, id: objs[objs.length-1].id + 1} ]
            fs.writeFileSync(this.path, JSON.stringify(data))
            return data;
        }else{
            let data = [{...obj, id: 1}]
            fs.writeFileSync(this.path, JSON.stringify(data))
            return data;
        }
    }
    
}

module.exports = Messages