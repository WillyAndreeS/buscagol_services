import { Injectable,Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Firestore } from 'firebase-admin/firestore';

@Injectable()
export class PostService {
  private firestore: Firestore;

  constructor( @Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App) {
      this.firestore = this.firebaseApp.firestore();
    }


    async getPostId(idpost: string){
      const postid = this.firestore.collection('socialpost').where('idpost','==',idpost);
  
      try {
        const snapshot = await postid.get();
        const listpost = snapshot.docs
          .map(doc => {
            const data = doc.data();
            return { id: doc.id, idpost: data.idpost, ...data };
          })
          .sort((a, b) => Number(b.idpost) - Number(a.idpost));
          
        return listpost;
      } catch (error) {
        console.error('Error al obtener el post:', error);
        throw new Error('No se pudo obtener este post o no existe');
      }
    }
  
    async getAllPost(){
      const allPost = this.firestore.collection('socialpost').where('estado','==','1');
  
      try {
        const snapshot = await allPost.get();
        const categories = snapshot.docs
          .map(doc => {
            const data = doc.data();
            return { id: doc.id, nroorden: data.nroorden, ...data };
          })
          .sort((a, b) => Number(b.nroorden) - Number(a.nroorden));
          
        return categories;
      } catch (error) {
        console.error('Error al obtener posts:', error);
        throw new Error('No se pudo obtener la lista de post');
      }
    }

  
}
