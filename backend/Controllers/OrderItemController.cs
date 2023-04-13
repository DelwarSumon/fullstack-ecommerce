using backend.DTOs;
using backend.Models;
using backend.Services.OrderItemService;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    public class OrderItemController : BaseController<OrderItem, OrderItemReadDto, OrderItemCreateDto, OrderItemUpdateDto>
    {
        private readonly IOrderItemService _orderItemService;

        public OrderItemController(IOrderItemService orderItemService) : base(orderItemService)
        {
            _orderItemService = orderItemService;
        }

        [HttpGet("order/{orderId}")]
        public async Task<ActionResult<IEnumerable<OrderItemReadDto>>> GetOrderItemsByOrderId(Guid orderId)
        {
            var orderItems = await _orderItemService.GetOrderItemsByOrderId(orderId);
            return Ok(orderItems);
        }
    }
}