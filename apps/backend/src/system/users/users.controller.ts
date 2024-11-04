import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { Roles } from "./roles.decorator";
import { UserRole } from "./user.entity";
import { ErrorResponseDto } from "../../common/dto/error.dto";
import { UserCreationDto, UserMutationDto, UserResponseDto } from "./user.dto";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "Create a user" })
  @ApiUnprocessableEntityResponse({ description: "Unique email constraint violation", type: ErrorResponseDto })
  create(@Body() user: UserCreationDto): Promise<UserResponseDto> {
    return this.usersService.create(user);
  }

  @Get()
  @ApiOperation({ summary: "Get all users" })
  index(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a user by ID" })
  get(@Param("id") id: string): Promise<UserResponseDto> {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a user by ID" })
  update(@Param("id") id: string, @Body() user: UserMutationDto): Promise<UserResponseDto> {
    return this.usersService.update(+id, user);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a user by ID" })
  @Roles(UserRole.ADMIN)
  delete(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
