import { Controller, Get, Post, Body } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Post('visit')
  async recordVisit(@Body('page') page: string) {
    return this.statsService.recordVisit(page);
  }

  @Get('total')
  async getTotalVisits() {
    return this.statsService.getTotalVisits();
  }

  @Get('by-page')
  async getVisitsByPage() {
    return this.statsService.getVisitsByPage();
  }
} 