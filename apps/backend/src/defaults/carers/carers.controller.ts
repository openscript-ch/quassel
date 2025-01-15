import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiTags, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { CarersService } from "./carers.service";
import { CarerCreationDto, CarerMutationDto, CarerResponseDto } from "./carer.dto";
import { ErrorResponseDto } from "../../common/dto/error.dto";
import { Roles } from "../../system/users/roles.decorator";
import { UserRole } from "../../system/users/user.entity";
import { Serialize } from "../../common/decorators/serialize";

@ApiTags("Carers")
@Controller("carers")
export class CarersController {
  constructor(private readonly carersService: CarersService) {}

  @Post()
  @ApiOperation({ summary: "Create a carer" })
  @ApiUnprocessableEntityResponse({ description: "Unique name constraint violation", type: ErrorResponseDto })
  @Serialize(CarerResponseDto)
  create(@Body() carer: CarerCreationDto): Promise<CarerResponseDto> {
    return this.carersService.create(carer);
  }

  @Get()
  @ApiQuery({ name: "participantId", required: false, type: Number })
  @ApiOperation({ summary: "Get all carers" })
  @Serialize(CarerResponseDto)
  index(@Query("participantId") participantId?: number): Promise<CarerResponseDto[]> {
    return this.carersService.findAll(participantId);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a carer by ID" })
  @Serialize(CarerResponseDto)
  get(@Param("id") id: string): Promise<CarerResponseDto> {
    return this.carersService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a carer by ID" })
  @Serialize(CarerResponseDto)
  update(@Param("id") id: string, @Body() carer: CarerMutationDto): Promise<CarerResponseDto> {
    return this.carersService.update(+id, carer);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a carer by ID" })
  @Roles(UserRole.ADMIN)
  delete(@Param("id") id: string) {
    return this.carersService.remove(+id);
  }
}
