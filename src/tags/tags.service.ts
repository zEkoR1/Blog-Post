import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private prismaService: PrismaService) {}

  async Tag(body: {tags: string[], post: { id: string } }) {
    const {tags, post} = body;
    // console.log(tags)
    // const post = await this.prismaService.post.findFirst({
    //   where: {
    //     title: title,
    //   },
    // });
    // if (!post) throw new BadRequestException('There is no post');

    // if (userID !== post.authorId)
    //   throw new BadRequestException('This user is not the post author');

    return this.prismaService.post.update({
      where: { id: post.id },
      data: {
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: {
        tags: true,
      },
    });
  }
}
