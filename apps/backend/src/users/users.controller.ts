import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles } from "./decorators/roles.decorator";
import { UserRole } from "./entities/user.entity";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "Create a user" })
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Get()
  @ApiOperation({ summary: "Get all users" })
  index() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a user by ID" })
  get(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a user by ID" })
  update(@Param("id") id: string, @Body() user: UpdateUserDto) {
    return this.usersService.update(+id, user);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a user by ID" })
  @Roles(UserRole.ADMIN)
  delete(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
