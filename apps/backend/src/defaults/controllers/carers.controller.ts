import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { CarersService } from "../services/carers.service";
import { ErrorResponseDto } from "src/common/dto/error-response.dto";
import { Roles } from "src/users/decorators/roles.decorator";
import { UserRole } from "src/users/entities/user.entity";
import { CarerCreationDto, CarerMutationDto, CarerResponseDto } from "../dto/carer.dto";

@ApiTags("Carers")
@Controller("carers")
export class CarersController {
  constructor(private readonly carersService: CarersService) {}

  @Post()
  @ApiOperation({ summary: "Create a carer" })
  @ApiUnprocessableEntityResponse({ description: "Unique name constraint violation", type: ErrorResponseDto })
  create(@Body() carer: CarerCreationDto): Promise<CarerResponseDto> {
    return this.carersService.create(carer);
  }

  @Get()
  @ApiOperation({ summary: "Get all carers" })
  index(): Promise<CarerResponseDto[]> {
    return this.carersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a carer by ID" })
  get(@Param("id") id: string): Promise<CarerResponseDto> {
    return this.carersService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a carer by ID" })
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
