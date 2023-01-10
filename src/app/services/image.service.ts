import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, list, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { PhotoService } from './photo.service';
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  //Atributos
  url: string = '';
  progress:number = 0;
  images:string[] = [];

  //Constructores
  constructor(private storage:Storage, private photoService:PhotoService) { }

  //Metodos
  public uploadImg(url:string, file: File, id:string){
    //Metodo para subir una imagen a firebase
    const imgRef = ref(this.storage, 'imagen/' + url + '/' + id)
    uploadBytes(imgRef, file).then(
      response => { this.getImage(url)}
    ).catch(err => {console.log(err)});
  }

  public uploadSingleImg(url:string, file: File, id:string, id_proyecto:number){
    //Metodo para subir una imagen a firebase de un projecto
    const imgRef = ref(this.storage, '/imagen/' + url + '/' + id)
    uploadBytes(imgRef, file).then(
      response => {
        getDownloadURL(imgRef).then(
          (resp => {
            let photoProject = {
              'name':id,
              'link':resp
            }
            this.photoService.postPhoto('photo', photoProject, id_proyecto).subscribe(
              resp => {console.log(resp)},
              err => {console.log(err)}
            )
          })
        )
      }
    ).catch(err => {console.log(err)});
  }
 

  public getImages(path:string){
    //Metodo para obtener las urls de imagenes de un directorio en firebase
    const imagesRef = ref(this.storage, 'imagen/' + path)
    list(imagesRef).then(async response => {
      for(let item of response.items){
        let url = await getDownloadURL(item);
        this.images.push(url);
      }
    }).
    catch(
      err => {console.log(err)}
    )
  }

  public getSingleImage(url:string){
    //Metodo para obtener la url de una imagen en especifico
    const imgRef = ref(this.storage, 'imagen/' + url)
    getDownloadURL(imgRef).then(
      (resp => {
        this.url = resp;
      })
    )
  }

  public getImage(url:string){
    //Metodo para obtener las urls de imagenes de un directorio en firebase
    //que contienen una sola imagen
    const imagesRef = ref(this.storage, 'imagen/' + url)
    list(imagesRef).then(async response => {
      for(let item of response.items){
        this.url = await getDownloadURL(item);
        console.log(this.url);
      }
    }).
    catch(
      err => {console.log(err)}
    )
  }

  public delete(url:string){
    //Metodo para eliminar una imagen de firebase
    const imagesRef = ref(this.storage, 'imagen/' + url);
    deleteObject(imagesRef).then(() => {
      console.log("Deleted successfully")
    }).catch((error) => {
      console.log(error)
    });
  }
}
