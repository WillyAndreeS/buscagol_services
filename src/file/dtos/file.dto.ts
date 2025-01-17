import { IsNotEmpty, IsString } from 'class-validator';

export class UploadFileDto {
  // file: Express.Multer.File;

  @IsNotEmpty()
  @IsString()
  originalname: string;

  @IsNotEmpty()
  @IsString()
  mimetype: string;

  @IsNotEmpty()
  buffer: Buffer;
}
