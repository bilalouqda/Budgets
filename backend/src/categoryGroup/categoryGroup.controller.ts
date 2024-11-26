import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryGroupsService } from './categoryGroup.service';
import { CreateCategoryGroupDto } from './dto/create-category-group.dto';
import { UpdateCategoryGroupDto } from './dto/update-category-group.dto';


@Controller('category-groups')
export class CategoryGroupsController {
  constructor(private readonly categoryGroupsService: CategoryGroupsService) {}

  @Post()
  create(@Body() createCategoryGroupDto: CreateCategoryGroupDto) {
    return this.categoryGroupsService.create(createCategoryGroupDto);
  }

  @Get()
  findAll() {
    return this.categoryGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryGroupsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryGroupDto: UpdateCategoryGroupDto,
  ) {
    return this.categoryGroupsService.update(id, updateCategoryGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryGroupsService.remove(id);
  }

  @Get('category/:categoryId')
  findByCategory(@Param('categoryId') categoryId: string) {
    return this.categoryGroupsService.findByCategory(categoryId);
  }
}
