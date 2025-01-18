import { IsString, IsNotEmpty,IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';


export class uploadPost{
    @IsString()
    @IsNotEmpty({message: 'La descripcion es obligatoria.'})
    description: string;

    @IsString()
    @IsOptional()
  //  @IsNotEmpty({message: 'La foto es obligatoria.'})
    urlfoto: string;
    
    @IsString()
    @IsNotEmpty({message: 'El idusuario es obligatorio.'})
    idusuario: string;


}
