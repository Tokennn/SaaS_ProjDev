import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [AuthModule, StatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {} 