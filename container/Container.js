const {promises:fs} = require('fs');
class Products{
    constructor(path){  
        this.path = path;
    }
    async getAll(){ 
        try {
            let datos = await fs.readFile(this.path, 'utf-8')
            let jsonDatos = JSON.parse(datos);  
            return jsonDatos;
        } catch (error) {       
            console.log(error);  
            return []
        }
    }
    async save(obj){
        let objs = await this.getAll();
        if(objs.length !== 0){
            let data = [...objs, {...obj, id: objs[objs.length-1].id + 1} ]
            await fs.writeFile(this.path, JSON.stringify(data))
            return data;
        }else{
            let data = [{...obj, id: 1}]
            await fs.writeFile(this.path, JSON.stringify(data))
            return data;
        }
    }
    async getById(id){
        let objs = await this.getAll();
        let obj = objs.filter(obj => obj.id == id);
        if(obj.length==0){
            return {error: 'producto no encontrado'};
        }
        return obj;
    }
    async edit(obj){
        let objs = await this.getAll();
        let index = objs.findIndex(o => o.id == obj.id);
        objs[index] = obj;
        try {
            await fs.writeFile(this.path, JSON.stringify(objs, null, 2));
        } catch (error) {
            return []
        }
    }
    async deleteById(id){
        let objs = await this.getAll();
        let obj = objs.filter(o => o.id != id);        
        try {
            await fs.writeFile(this.path, JSON.stringify(obj, null, 2));
        } catch (error) {
            return `No se puede borrar ese registro`
        }
    }
}

module.exports = Products