namespace backend.Repositories.BaseRepo
{
    public interface IBaseRepo<T>
    {
        Task<IEnumerable<T>> GetAllAsync(QueryOptions options);
        Task<T?> GetByIdAsync(Guid id);
        Task<T> UpdateOneAsync(T update);
        Task<bool> DeleteOneAsync(Guid id);
        Task<T?> CreateOneAsync(T create);
    }

    public class QueryOptions
    {
        public string Sort { get; set; } = string.Empty;
        public string Search { get; set; } = string.Empty;
        public SortBy SortBy { get; set; }
        public int Limit { get; set; } = 30;
        public int Skip { get; set; } = 0;
        public Guid? CategoryId { get; set; }
        public double? Price_min { get; set; }
        public double? Price_max { get; set; }
    }

    public enum SortBy
    {
        ASC,
        DESC
    }
}