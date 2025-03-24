import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async recordVisit(page: string) {
    return this.prisma.visit.create({
      data: {
        page,
      },
    });
  }

  async getTotalVisits() {
    return this.prisma.visit.count();
  }

  async getVisitsByPage() {
    return this.prisma.visit.groupBy({
      by: ['page'],
      _count: true,
    });
  }
} 