/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reaction, ReactionType } from './schemas/reaction.schema';

@Injectable()
export class ReactionService {
  constructor(
    @InjectModel(Reaction.name) private readonly reactionModel: Model<Reaction>,
  ) {}

  async addReaction(userId: string, blogId: string, reactionType: ReactionType): Promise<Reaction> {
    // Check if the user has already reacted to the blog
    const existingReaction = await this.reactionModel.findOne({ blog: blogId, user: userId });

    if (existingReaction) {
      // User has already reacted
      if (existingReaction.type === reactionType) {
        // Undo the reaction if the new reaction type is the same
        await this.reactionModel.findByIdAndDelete(existingReaction._id);
        return null; // Indicate that the reaction was undone
      } else {
        // Update the reaction with the new type if it's different
        existingReaction.type = reactionType;
        await existingReaction.save();
        return existingReaction;
      }
    } else {
      // User has not reacted before, create a new reaction
      const reaction = await this.reactionModel.create({ user: userId, blog: blogId, type: reactionType });
      return reaction;
    }
  }
}
