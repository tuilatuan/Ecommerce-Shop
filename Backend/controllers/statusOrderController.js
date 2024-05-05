const catchAsync = require("../utils/catchAsync");
const prisma = require("../prisma/prisma");
const StatusOrderUtils = require("../utils/statusOrderUtils");

const statusOrderUtils = new StatusOrderUtils();

exports.findAll = catchAsync(async (req, res) => {
    const statusOrders = await prisma.statusOrder.findMany();
    res.status(200).json({
        status: "success",
        length: statusOrders.length,
        data: {
            statusOrders
        },
    });
});

exports.findById = catchAsync(async (req, res) => {
    const query = req.query

    if (!query.id) {
        return res.status(400).json({
            status: 'No id provided'
        })
    }

    var statusOrder = await statusOrderUtils.getById(parseInt(query.id))

    if (!statusOrder) {
        return res.status(400).json({
            status: 'No statusOrder found'
        })
    } else {
        return res.status(200).json({
            status: 'StatusOrder search successful',
            statusOrder
        })
    }

});

exports.findByName = catchAsync(async (req, res) => {
    const query = req.query

    if (!query.name) {
        return res.status(400).json({
            status: 'No name provided'
        })
    }

    var statusOrder = await statusOrderUtils.getByName(query.name)

    if (!statusOrder) {
        return res.status(400).json({
            status: 'No statusOrder found'
        })
    } else {
        return res.status(200).json({
            status: 'StatusOrder search successful',
            statusOrder
        })
    }

});

exports.create = catchAsync(async (req, res) => {
    const data = req.body;
    if (!data) {
        res
            .status(400)
            .json({ message: "No content provided" });
    }
    const statusOrder = await prisma.statusOrder.create({
        data: data
    });
    if (statusOrder) {
        res
            .status(200)
            .json({ status: "Create statusOrder successfully!", statusOrder });
    }
})

exports.deleteById = catchAsync(async (req, res) => {
    const id = parseInt(req.query.id)
    if (!id) {
        res.status(400).json({ message: "No id provided" });
    }
    const statusOrder = await statusOrderUtils.getById(id)
    if (!statusOrder) {
        res.status(400).json({ message: "No statusOrder found" });
    }
    const statusOrderDelete = await prisma.statusOrder.delete({
        where: {
            id: id
        },
    });
    if (statusOrderDelete) {
        res.status(200).json({ message: "Delete statusOrder successfully!" });
    }
});

exports.updateById = catchAsync(async (req, res) => {
    const data = req.body;
    if (!data) {
        res
            .status(400)
            .json({ message: "No content provided" });
    }
    const statusOrder = await statusOrderUtils.getById(parseInt(data.id))
    if (!statusOrder) {
        res.status(400).json({ message: "No statusOrder found" });
    }
    const updateStatusOrder = await prisma.statusOrder.update({
        where: {
            id: parseInt(data.id)
        },
        data: {
            name: data.name ?? statusOrder.name,
        },
    });
    if (updateStatusOrder) {
        res
            .status(200)
            .json({ status: "Update statusOrder successfully!", updateStatusOrder });
    }
});




