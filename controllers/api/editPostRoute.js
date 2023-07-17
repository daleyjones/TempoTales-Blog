const { Post } = require('../../models');

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;

    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.title = title;
    post.body = body;

    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};
