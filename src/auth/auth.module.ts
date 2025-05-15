import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module'; // Ensure the path is correct

@Module({
  imports: [PrismaModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
