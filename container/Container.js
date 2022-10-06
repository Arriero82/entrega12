const fs = require('fs');
class Products{
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
    getById(id){
        let objs = this.getAll();
        let obj = objs.filter(obj => obj.id == id);
        if(obj.length==0){
            return {error: 'producto no encontrado'};
        }
        return obj;
    }
    edit(obj){
        let objs = this.getAll();
        let index = objs.findIndex(o => o.id == obj.id);
        objs[index] = obj;
        try {
            fs.writeFileSync(this.path, JSON.stringify(objs, null, 2));
        } catch (error) {
            return []
        }
    }
    async deleteById(id){
        let objs = await this.getAll();
        let obj = objs.filter(o => o.id != id);        
        try {
            fs.writeFileSync(this.path, JSON.stringify(obj, null, 2));
        } catch (error) {
            return `No se puede borrar ese registro`
        }
    }
}

module.exports = Products