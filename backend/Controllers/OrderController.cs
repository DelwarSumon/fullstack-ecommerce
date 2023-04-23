using backend.DTOs;
using backend.Models;
using backend.Services.OrderService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using backend.Helpers;

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
            
            var user = HttpContext.User;
            var isAdmin = user.IsInRole("Admin");
            var isOwner = user.FindFirstValue(ClaimTypes.NameIdentifier) == userId.ToString();

            if (!isAdmin && !isOwner)
            {
                throw ServiceException.Unauthorized();
            }

            var orders = await _orderService.GetOrdersByUserId(userId);
            return Ok(orders);
        }
    }
}