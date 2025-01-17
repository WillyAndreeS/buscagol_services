import { ConfigModule, ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import config from '../../config';
import * as Joi from 'joi';
import * as admin from 'firebase-admin';
import { enviroments } from 'enviroments'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? undefined : enviroments.dev || '.env',
      load: [config],
      validationSchema: Joi.object({
        CUSTOMFIREBASE_TYPE: Joi.string().required(),
        APIKEY: Joi.string().required(),
        AUTH_DOMAIN: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
        PROJECTID: Joi.string().required(),
        STORAGE_BUCKET: Joi.string().required(),
        APP_ID: Joi.string().required(),
        MEASUREMENT_ID: Joi.string().required(),
        CUSTOMFIREBASE_PROJECT_ID: Joi.string().required(),
        CUSTOMFIREBASE_PRIVATE_KEY_ID: Joi.string().required(),
        CUSTOMFIREBASE_PRIVATE_KEY: Joi.string().required(),
        CUSTOMFIREBASE_CLIENT_EMAIL: Joi.string().required(),
        CUSTOMFIREBASE_CLIENT_ID: Joi.string().required(),
        AUTH_URI: Joi.string().required(),
        TOKEN_URI: Joi.string().required(),
        AUTH_PROVIDER_X509_CERT_URL: Joi.string().required(),
        CLIENT_X509_CERT_URL: Joi.string().required(),
      }),
      validationOptions: {
        abortEarly: true,
      }, // Load the configuration
    }),
  ],
  providers: [
    {
      provide: 'FIREBASE_ADMIN', // Add DataSource as a provider
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const firebaseConfig = {
          api_key: configService.get<string>('APIKEY'),
          auth_domai: configService.get<string>('AUTH_DOMAIN'),
          database_url: configService.get<string>('DATABASE_URL'),
          project_id: configService.get<string>('CUSTOMFIREBASE_PROJECT_ID'),
          storagebucket: configService.get<string>('STORAGE_BUCKET'),
          app_id: configService.get<string>('APP_ID'),
          measurement_id: configService.get<string>('MEASUREMENT_ID'),
          type: configService.get<string>('CUSTOMFIREBASE_TYPE'),
          private_key_id: configService.get<string>('CUSTOMFIREBASE_PRIVATE_KEY_ID'),
          private_key: configService
            .get<string>('CUSTOMFIREBASE_PRIVATE_KEY')
            .replace(/\\n/g, '\n'),
          client_email: configService.get<string>('CUSTOMFIREBASE_CLIENT_EMAIL'),
          client_id: configService.get<string>('CUSTOMFIREBASE_CLIENT_ID'),
          auth_uri: configService.get<string>('AUTH_URI'),
          token_uri: configService.get<string>('TOKEN_URI'),
          auth_provider_x509_cert_url: configService.get<string>(
            'AUTH_PROVIDER_X509_CERT_URL',
          ),
          client_x509_cert_url: configService.get<string>(
            'CLIENT_X509_CERT_URL',
          ),
        };

        const app = admin.initializeApp({
          credential: admin.credential.cert(
            firebaseConfig as admin.ServiceAccount,
          ),
          storageBucket: configService.get<string>('STORAGE_BUCKET'),
        });
        return app;
      },
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class DataBaseFirebaseModule {}
