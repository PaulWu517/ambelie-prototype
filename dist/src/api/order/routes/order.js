"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        // 默认CRUD路由
        {
            method: 'GET',
            path: '/orders',
            handler: 'order.find',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'GET',
            path: '/orders/:id',
            handler: 'order.findOne',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'POST',
            path: '/orders',
            handler: 'order.create',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'PUT',
            path: '/orders/:id',
            handler: 'order.update',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'DELETE',
            path: '/orders/:id',
            handler: 'order.delete',
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
