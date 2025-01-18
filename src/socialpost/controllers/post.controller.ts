import { Controller,Get,Param } from '@nestjs/common';
import { uploadPost } from '../dtos/post_upload.dto';
import {  PostService} from '../providers/post.service';


@Controller()
export class PostController {
  
  constructor(
    private readonly postService: PostService) {}
  
  // The pattern (name of service)
  // Will be the same with the Gateway service call
  
  @Get('listPostId/:idPost')
  async getPostId(@Param('idPost') idpost: string) {
    try {
      return this.postService.getPostId(idpost);
    } catch (error) {
      
      return { success: false, message: 'Error :', error };
    }
  }

  @Get('listAllPost')
  async getAllPost() {
    try {
      return this.postService.getAllPost();
    } catch (error) {
      
      return { success: false, message: 'Error :', error };
    }
  }

  
}
