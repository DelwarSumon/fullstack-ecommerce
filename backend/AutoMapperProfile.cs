using backend.DTOs;
using backend.Models;
using AutoMapper;
using System.Text;

namespace backend
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            /* CreateMap<TCreateDto, T>(); */

            CreateMap<User, UserReadDto>();
            CreateMap<UserUpdateDto, User>();
            CreateMap<UserCreateDto, User>()
            .ForMember(dest => dest.Password, opt => opt.MapFrom(src => Encoding.UTF8.GetBytes(src.Password)));

            CreateMap<Category, CategoryReadDto>();
            CreateMap<CategoryUpdateDto, Category>();
            CreateMap<CategoryCreateDto, Category>();

            CreateMap<Product, ProductReadDto>();
            CreateMap<ProductUpdateDto, Product>();
            CreateMap<ProductCreateDto, Product>();

            CreateMap<FileModel, FileReadDto>();
            CreateMap<FileUpdateDto, FileModel>();
            CreateMap<FileCreateDto, FileModel>();

            CreateMap<Order, OrderReadDto>();
            CreateMap<OrderUpdateDto, Order>();
            CreateMap<OrderCreateDto, Order>();

            CreateMap<OrderItem, OrderItemReadDto>();
            CreateMap<OrderItemUpdateDto, OrderItem>();
            CreateMap<OrderItemCreateDto, OrderItem>();
        }
    }
}