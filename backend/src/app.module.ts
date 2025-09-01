import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          type: 'postgres',
          url: config.get<string>('DATABASE_URL'),
          autoLoadEntities: true,  // automatically load entities without specifying
          synchronize: true,
        }
      },
    }),

    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(dataSource: DataSource) {
    if (dataSource.isInitialized) {
      console.log('✅ Database connected!');
    } else {
      console.log('❌ Database not connected!');
    }
  }
}
