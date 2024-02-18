/* eslint-disable prettier/prettier */

import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reaction, ReactionType } from './schemas/reaction.schema'; 
import { ReactionService } from './reactions.service';
@Controller('reactions')
export class ReactionsController {

  constructor(private readonly reactionService: ReactionService) {}

  // Creating a new reaction
  @Post()
  @UseGuards(AuthGuard())
  async createReaction(
    @Req() req: any,
    @Body() reactionDto: { blogId: string, reactionType: ReactionType }, 
  ): Promise<Reaction> {
    console.log('User:', req.user); 
    const userId = req.user.id; 
    const { blogId, reactionType } = reactionDto;
    return this.reactionService.addReaction(userId, blogId, reactionType);
  }
}
