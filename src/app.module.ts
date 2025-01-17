import { Module } from '@nestjs/common';
import { FilesServiceController } from './file/controllers/files_service.controller';
import { DataBaseFirebaseModule } from './database/modules/database_firebase.module';

@Module({
  imports: [DataBaseFirebaseModule],
  controllers: [FilesServiceController],
  providers: [],
  exports: [DataBaseFirebaseModule]
})
export class AppModule {}
