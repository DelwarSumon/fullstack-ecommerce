using backend.Database;
using backend.Models;
using backend.Repositories.BaseRepo;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.ProductRepo
{
    public class ProductRepo : BaseRepo<Product>, IProductRepo
    {
        protected new readonly DatabaseContext _context;
        public ProductRepo(DatabaseContext context) : base(context)
        {
            _context = context;
        }

        public override async Task<IEnumerable<Product>> GetAllAsync(QueryOptions queryOptions)
        {
            var query = _context.Products.AsQueryable();

            if (queryOptions.CategoryId.HasValue)
            {
                query = query.Where(p => p.CategoryId == queryOptions.CategoryId.Value);
            }

            if (queryOptions.Price_min.HasValue)
            {
                query = query.Where(p => p.Price >= queryOptions.Price_min.Value);
            }

            if (queryOptions.Price_max.HasValue)
            {
                query = query.Where(p => p.Price <= queryOptions.Price_max.Value);
            }

            // Search for products with matching title or description
            if (!string.IsNullOrEmpty(queryOptions.Search))
            {
                query = query.Where(p => p.Title.ToLower().Contains(queryOptions.Search.ToLower()) || p.Description.ToLower().Contains(queryOptions.Search.ToLower()));
            }

            // sorting
            if (!string.IsNullOrEmpty(queryOptions.Sort))
            {
                var sortField = queryOptions.Sort;
                var sortDirection = queryOptions.SortBy;

                // Apply the sort field to the query
                switch (sortField.ToLowerInvariant())
                {
                    case "title":
                        if (sortDirection == SortBy.ASC)
                        {
                            query = query.OrderBy(x => x.Title);
                        }
                        else
                        {
                            query = query.OrderByDescending(x => x.Title);
                        }
                        break;
                    case "price":
                        if (sortDirection == SortBy.ASC)
                        {
                            query = query.OrderBy(x => x.Price);
                        }
                        else
                        {
                            query = query.OrderByDescending(x => x.Price);
                        }
                        break;
                    default:
                        break;
                }
            }

            // Sort the products by the specified property and direction
            // if (queryOptions.Sort.Trim().Length > 0)
            // {
            //     if (query.GetType().GetProperty(queryOptions.Sort) != null)
            //     {
            //         var property = query.GetType().GetProperty(queryOptions.Sort.ToLowerInvariant());
            //         if (property != null)
            //         {
            //             query = (queryOptions.SortBy == SortBy.DESC)
            //                 ? query.OrderByDescending(e => property.GetValue(e))
            //                 : query.OrderBy(e => property.GetValue(e));
            //         }
            //     }
            // }

            // pagination
            if (queryOptions.Limit > 0)
            {
                query = query.Skip(queryOptions.Skip).Take(queryOptions.Limit);
            }

            return await query.Include(p => p.Category).Include(i => i.Images).ToArrayAsync();
        }

        public override async Task<Product?> GetByIdAsync(Guid id)
        {
            return await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == id);
        }
    }
}