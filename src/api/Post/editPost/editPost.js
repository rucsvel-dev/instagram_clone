import {prisma} from "../../../../generated/prisma-client";


export default {
    Mutation: {
        editPost: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request)
            const { user } = request
            const { postId, caption, location, action } = args
            const post = await prisma.$exists.post({ id: postId, user: { id: user.id } })
            if(post) {
                if (action === 'DELETE') {
                    return prisma.deletePost({ id: postId })
                } else if (action === 'EDIT') {
                    return prisma.updatePost({
                        data: { caption, location },
                        where: { id: postId }
                    })
                }
            }else {
                throw Error("You can't do that")
            }
        }
    }
}