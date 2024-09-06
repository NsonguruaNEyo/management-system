import { DataSource, DataSourceOptions } from "typeorm";
import { ConfigService } from "@nestjs/config";
import {config} from 'dotenv';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions=({
    type: `postgres`,
    port: configService.get<number>(`DB_PORT`),
    host: configService.get(`DB_HOST`),
    username: configService.get(`DB_USER`),
    password: configService.get(`DB_PASSWORD`),
    database: configService.get(`DB_NAME`),
    synchronize: false,
    // autoLoadEntities: true,
    entities:['dist/**/*.entity.js'],
    migrations:['dist/config/migrations/*.js'],
});
const dataSource = new DataSource(dataSourceOptions)
export default DataSource;