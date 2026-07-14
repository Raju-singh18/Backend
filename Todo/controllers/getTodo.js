const Todo = require("../models/Todo");

const getTodo = async (req, res) => {
    try {

        const response = await Todo.find({});

        return res.status(200).json({
            success: true,
            message: "All todos found successfully..",
            totalTodos: response.length,
            data: response
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


 


// ! get todos by id
const getTodoById = async (req, res) => {
    try {

        const id = req.params.id;

        // const response = await Todo.findById(id);
        const response = await Todo.findById({_id:id});


        if (!response) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }


        return res.status(200).json({
            success: true,
            message: "Todo found successfully...",
            data: response
        });


    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = { getTodo, getTodoById };