const express = require('express');
const router = express.Router();
const OrderService = require('../services/OrderService');
const { authMiddleware } = require('../../middleware');

router.post('/order', async (req, res) => {
    try {
        const orderData = req.body;
        const newOrder = await OrderService.createOrder(orderData);
        res.status(201).json({
        message: 'Order berhasil dibuat!',
        order: newOrder,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    }  
);

router.put('/order/approve/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedOrder = await OrderService.approveOrder(id);
        res.status(200).json({
            message: 'Order berhasil di-approve!',
            order: updatedOrder,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/order/reject/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedOrder = await OrderService.rejectOrder(id);
        res.status(200).json({
            message: 'Order berhasil di-reject!',
            order: updatedOrder,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/order/:status', authMiddleware, async (req, res) => {
    try {
        const { status } = req.params;
        const orders = await OrderService.getAllOrder(status);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;