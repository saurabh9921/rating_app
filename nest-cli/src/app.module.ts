import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StoresModule } from './stores/stores.module';
import { RatingsModule } from './ratings/ratings.module';
// import { DashboardModule } from './dashboard/dashboard.module';
import { User } from './users/entities/user.entity';
import { Store } from './stores/entities/store.entity';
import { Rating } from './ratings/entities/rating.entity';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'saurabh@99',
      database: 'store_rating_app',
      entities: [User, Store, Rating],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    StoresModule,
    RatingsModule,
    DashboardModule,
  ],
})
export class AppModule {}