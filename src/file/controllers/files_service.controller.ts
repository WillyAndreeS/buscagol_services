import { Controller, Post, UseInterceptors, Inject, Get, Body ,UploadedFile} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { FileInterceptor, } from '@nestjs/platform-express';
import { UploadFileDto } from '../dtos/file.dto';



@Controller('files')
export class FilesServiceController {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App,
    private readonly configService: ConfigService,
  ) {}

  @Get('test')
  async test() {
    return 'Hola prueba';
  }

  @Post('testv2')
   testv2(@Body() body: any) {
    return {
      ...body,
    };
   
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file:  Express.Multer.File) {

    const fileData: UploadFileDto = {
      originalname: file.originalname,
      mimetype: file.mimetype,
      buffer: file.buffer, // buffer como tipo Buffer
    };

    const bucket = this.firebaseApp.storage().bucket();

   // const fileBuffer = Buffer.from(fileData.buffer, 'base64');
    const destination = `uploads/${fileData.originalname}`;

    // Subir archivo a Firebase Storage
    const fileRef = bucket.file(destination);

    // Subimos el archivo con los metadatos adecuados (tipo MIME)
    await fileRef.save(fileData.buffer, {
      metadata: { contentType: file.mimetype },
    });

    // Ahora que el archivo está subido, obtenemos la URL privada
    const [signedUrl] = await fileRef.getSignedUrl({
      action: 'read', // Solo permitir lectura del archivo
      expires: Date.now() + 3600 * 1000, // La URL estará activa durante 1 hora
    });

    //const fileUrl = `https://storage.googleapis.com/${this.firebaseApp.options.storageBucket}/${destination}`;

    return { message: 'SUBIDO CORRECTAMENTE', url: signedUrl };
  }

 /*   @Post('upload')
    @UseInterceptors(FileInterceptor('archivo', multerOptions))
async uploadFile(@UploadedFile() file: Express.Multer.File) {
  if (!file) {
    throw new BadRequestException('No file uploaded');
  }

  console.log('File uploaded successfully:', {
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
  });

  return {
    message: 'File uploaded successfully',
    file: {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    },
  };
}*/

}
