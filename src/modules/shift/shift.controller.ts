import {
  Controller,
  Body,
  Get,
  Param,
  Patch,
  HttpCode,
  ParseUUIDPipe,
  UseFilters,
} from '@nestjs/common';
import { ResponseDto } from '../../utils/ResponseDto';
import { GetShiftsResponse } from './dto/GetShiftsResponse';
import { GetShiftResponse } from './dto/GetShiftResponse';
import { ShiftService } from './shift.service';
import { ValidationPipe } from '../ValidationPipe';
import { BookTalentRequest } from './dto/BookTalentRequest';
import { HttpExceptionFilter } from '../filters/http-exception.filter';

@Controller('shift')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Get(':jobId')
  async getShifts(
    @Param('jobId', new ParseUUIDPipe()) jobId: string,
  ): Promise<ResponseDto<GetShiftsResponse>> {
    const shifts = await this.shiftService.getShifts(jobId);
    return new ResponseDto<GetShiftsResponse>(
      new GetShiftsResponse(
        shifts.map(shift => {
          return new GetShiftResponse(
            shift.id,
            shift.talentId,
            shift.jobId,
            shift.startTime,
            shift.endTime,
            shift.canceled,
          );
        }),
      ),
    );
  }

  @Patch(':shiftId/book')
  @HttpCode(204)
  @UseFilters(HttpExceptionFilter)
  async bookTalent(
    @Param('shiftId', new ParseUUIDPipe()) shiftId: string,
    @Body(new ValidationPipe<BookTalentRequest>()) dto: BookTalentRequest,
  ): Promise<void> {
    return this.shiftService.bookTalent(dto.talent, shiftId);
  }

  @Patch(':shiftId/cancel')
  @HttpCode(204)
  @UseFilters(HttpExceptionFilter)
  async cancelShift(
    @Param('shiftId', new ParseUUIDPipe()) shiftId: string,
  ): Promise<void> {
    return this.shiftService.cancelShift(shiftId);
  }
}
