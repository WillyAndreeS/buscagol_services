import { registerAs } from "@nestjs/config";

export default registerAs('config', () =>{
    return {
        firebase: {
            apiKey: process.env.APIKEY,
            authDomain: process.env.AUTH_DOMAIN,
            databaseURL: process.env.DATABASE_URL,
            projectId: process.env.PROJECTID,
            storageBucket: process.env.STORAGEBUCKET,
            messagingSenderId: process.env.MESSAGIN_SENDER_ID,
            appId: process.env.APP_ID,
            measurementId: process.env.MEASUREMENT_ID
        },

        databaseGCP: {
            type: process.env.DATABASE_TYPE,
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [__dirname + '/../*/.entity{.ts,.js}'],
            synchronize: false,
            options: {
                trustServerCertificate: true,
            },
        },

        googleStorage: {
            keyFilename: process.env.KEY_PATH_GOOGLE, // Ruta al archivo de clave JSON
            projectId: process.env.ID_PROJECT_GOOGLE,
            bucketName: process.env.ID_BUCKET_ACP
        }

    }
})
