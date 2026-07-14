const Todo = require("../models/Todo");


const createTodo = async (req, res) => {
    try {

        const { title, description } = req.body;


        const response = await Todo.create({
            title,
            description
        });


        return res.status(201).json({
            success: true,
            message: "Todo created successfully..",
            data: response
        });


    } catch (error) {

        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = { createTodo };