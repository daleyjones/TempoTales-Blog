const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// POST route to create a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comments.create({
      body: req.body.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT route to update an existing comment
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedComment = await Comments.update(
      {
        body: req.body.body,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (!updatedComment[0]) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE route to delete a comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedComment = await Comments.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deletedComment) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(deletedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
