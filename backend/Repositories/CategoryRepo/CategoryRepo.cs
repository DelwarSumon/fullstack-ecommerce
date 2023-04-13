using backend.Repositories.BaseRepo;
using backend.Models;
using backend.Database;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.CategoryRepo
{
    public class CategoryRepo : BaseRepo<Category>, ICategoryRepo
    {
        protected new readonly DatabaseContext _context;
        public CategoryRepo(DatabaseContext context) : base(context)
        {
            _context = context;
        }

        public new async Task<IEnumerable<Category>> GetAllAsync(QueryOptions queryOptions)
        {
            var query = _context.Categories.AsQueryable();

            if (!string.IsNullOrEmpty(queryOptions.Search))
            {
                query = query.Where(p => p.Name.ToLower().Contains(queryOptions.Search.ToLower()) || p.Description.ToLower().Contains(queryOptions.Search.ToLower()));
            }

            // sorting
            if (!string.IsNullOrEmpty(queryOptions.Sort))
            {
                var sortField = queryOptions.Sort;
                var sortDirection = queryOptions.SortBy;

                // Apply the sort field to the query
                switch (sortField.ToLowerInvariant())
                {
                    case "name":
                        if (sortDirection == SortBy.ASC)
                        {
                            query = query.OrderBy(x => x.Name);
                        }
                        else
                        {
                            query = query.OrderByDescending(x => x.Name);
                        }
                        break;
                    default:
                        break;
                }
            }

            // pagination
            if (queryOptions.Limit > 0)
            {
                query = query.Skip(queryOptions.Skip).Take(queryOptions.Limit);
            }

            return await query.ToArrayAsync();
        }
    }
}