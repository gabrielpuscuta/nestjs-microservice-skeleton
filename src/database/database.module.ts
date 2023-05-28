import { Module, Global } from '@nestjs/common';
import { sequelizeProvider } from './sequelize.provider';

@Global()
@Module({
  providers:[
    {
        provide: "DB",
        useFactory: sequelizeProvider,
    },
  ],
  exports: [
    'DB'
  ],
})
export class DatabaseModule { }
