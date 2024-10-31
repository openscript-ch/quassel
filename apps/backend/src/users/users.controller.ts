import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserCreationDto } from "./dto/user-creation.dto";
import { UserMutationDto } from "./dto/user-mutation.dto";
import { ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { Roles } from "./decorators/roles.decorator";
import { UserRole } from "./entities/user.entity";
import { ErrorResponseDto } from "../common/dto/error-response.dto";
import { UserResponseDto } from "./dto/user-response.dto";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "Create a user" })
  @ApiUnprocessableEntityResponse({ description: "Unique email constraint violation", type: ErrorResponseDto })
  @UsePipes(new ValidationPipe({ groups: ["create"] }))
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
