
const fs = require('fs');


class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        this.contarID = 1;
        this.productos = [];
        
    }

    async leer(){
        try{

            let contenido = await fs.promises.readFile(this.nombreArchivo,'utf-8')
            this.productos = JSON.parse(contenido)

            for(let elemento of this.productos){
               if(elemento.id > this.contarID){
                   this.contarID = elemento.id;
               }
            }
            
        }catch(error){
           console.log(error);
        }
  }

   async escribir() {
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.productos));
        
   }
   
    save(object) {
   
        let id = this.contarID;
        if (this.productos.length > 0) {
            id = this.productos[this.productos.length - 1].id + 1;
        }
        object.id = id;
        this.productos.push(object);
        this.escribir();
        return id;
    }

   async getById(id) {
        await this.leer();
        if(this.productos !== []){
            const producto = this.productos.find(producto => producto.id === id);
            return console.log(producto);
        }else{
            return null;
        }
    }

   async  getAll() {
        await this.leer();
        return this.productos;
     }
    

   async deleteById(id) {
        await this.leer();
        if(this.leer() !== []){
          const  resultado = this.productos.filter(producto => producto.id !== id);
            this.productos = new Array(resultado);
            this.escribir();
         
        }else{
            console.log('No hay productos');
        }
        return resultado;
      
    }

  deleteAll() {
      if(this.leer() !== []){
        this.productos = [];
        this.escribir();
      }else{
            console.log('No hay productos');
        }
      
    }
  
}

module.exports = Contenedor;

