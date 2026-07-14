const Todo = require("../models/Todo");

exports.updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;
    const response = await Todo.findByIdAndUpdate(
      { _id: id },
      { title, description,updatedAt:Date.now() },
      { new: true },
    );

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Todo updated successfully.",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.deleteTodo = async (req, res) => {
    try {

        const { id } = req.params;

        const response = await Todo.findByIdAndDelete({
            _id: id
        });


        if (!response) {
            return res.status(404).json({
                success: false,
                message: "Todo does not exist"
            });
        }


        return res.status(200).json({
            success: true,
            message: "Todo deleted successfully.",
            data: response
        });


    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
