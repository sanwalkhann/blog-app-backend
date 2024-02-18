/* eslint-disable prettier/prettier */
import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ReplyService } from './reply.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentDto } from './dto/createcoment.dto';
import { CreateReplyDto } from './dto/createreplt.sto';

@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly replyService: ReplyService,
  ) {}

  // Create a new comment
  @Post(':blogId')
  @UseGuards(AuthGuard('jwt'))
  async createComment(
    @Req() req: any,
    @Body() createCommentDto: CreateCommentDto,
    @Param('blogId') blogId: string,
  ) {
    console.log(req.user)
    const userId = req.user.id;
    const commentData = { ...createCommentDto, userId , blogId };
    return this.commentService.create(commentData);
  }

  // Create a new reply to a comment
  @Post(':commentId/replies')
  @UseGuards(AuthGuard('jwt'))
  async createReply(
    @Req() req: any,
    @Body() createReplyDto: CreateReplyDto,
    @Param('commentId') commentId: string,
  ) {
    
    const userId = req.user.id;
    const replyData = { ...createReplyDto, userId, commentId };
    return this.replyService.create(replyData);
  }
}
