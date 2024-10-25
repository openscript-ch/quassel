import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "Create a user" })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all users" })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a user by ID" })
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a user by ID" })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a user by ID" })
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
