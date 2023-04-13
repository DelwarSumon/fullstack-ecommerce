using backend.Services.BaseService;
using backend.Models;
using backend.DTOs;
using AutoMapper;
using backend.Repositories.OrderRepo;

namespace backend.Services.OrderService
{
    public class OrderService : BaseService<Order, OrderReadDto, OrderCreateDto, OrderUpdateDto>, IOrderService
    {
        private readonly IOrderRepo _orderRepo;
        private new readonly IMapper _mapper;
        public OrderService(IMapper mapper, IOrderRepo orderRepo) : base(mapper, orderRepo)
        {
            _orderRepo = orderRepo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<OrderReadDto>> GetOrdersByUserId(Guid userId)
        {
            var orders = await _orderRepo.GetOrdersByUserIdAsync(userId);
            return _mapper.Map<IEnumerable<OrderReadDto>>(orders);
        }
    }
}