import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageService } from 'src/shared/upload-image/upload-image.service';
import { CategoryGroupService } from '../category-group/category-group.service';
import { CategoryService } from '../category/category.service';
import { PendingRecipeService } from '../pending-recipe/pending-recipe.service';
import { RecipeService } from '../recipe/recipe.service';
import { SearchService } from '../search/search.service';
import { CreatePublicPendingRecipeDto } from './dto/create-public.dto';
import { SearchPublicDto } from './dto/search-public.dto';
import { PublicService } from './public.service';

@Controller('public')
export class PublicController {
  constructor(
    private readonly publicService: PublicService,
    private readonly recipeService: RecipeService,
    private readonly searchService: SearchService,
    private readonly categoryService: CategoryService,
    private readonly categoryGroupService: CategoryGroupService,
    private readonly pendingRecipeService: PendingRecipeService,
    private readonly uploadImageService: UploadImageService,
  ) {}

  // @Get('recipe/:id')
  // findOne(@Param('id') id) {
  //   return this.recipeService.findId(+id);
  // }

  @Get('recipe/:title')
  findOneRecipeTitle(@Param('title') recipeTitle) {
    return this.recipeService.findTitle(recipeTitle);
  }

  @Get('search/matches')
  async findMatchesTitleRecipe(@Query() queryG: SearchPublicDto) {
    const { query, categories, page, perPage } = queryG;

    return this.searchService.findMatchesRecipe([query, categories], {
      page,
      perPage,
    });
  }

  @Get('category')
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('category-group')
  findAllCG() {
    return this.categoryGroupService.findAll();
  }

  @Post('pendingRecipe')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() file,
    @Body() createRecipeDto: CreatePublicPendingRecipeDto,
  ) {
    let recipeWithImageUrl: any = {
      ...createRecipeDto,
    };

    if (file?.buffer) {
      const resultData = await this.uploadImageService.createThumbnails(
        file.buffer,
      );
      recipeWithImageUrl = {
        ...recipeWithImageUrl,
        imageUrl: resultData.name,
      };
    }

    return await this.recipeService.createRecipe(recipeWithImageUrl);
  }
}
