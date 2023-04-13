using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs;
using backend.Models;
using backend.Services.BaseService;
using backend.Services.OrderService;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    public class OrderController : BaseController<Order, OrderReadDto, OrderCreateDto, OrderUpdateDto>
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService) : base(orderService)
        {
            _orderService = orderService;
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<OrderReadDto>>> GetOrdersByUserId(Guid userId)
        {
            var orders = await _orderService.GetOrdersByUserId(userId);
            return Ok(orders);
        }
    }
}