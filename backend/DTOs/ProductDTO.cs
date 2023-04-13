using backend.Models;

namespace backend.DTOs
{
    public class ProductBaseDto
    {
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public double Price { get; set; }
        public Guid CategoryId { get; set; }
    }

    public class ProductReadDto : ProductBaseDto
    {
        public Guid Id { get; set; }
        public ICollection<FileReadDto>? Images { get; set; }
        public CategoryReadDto Category { get; set; } = null!;
    }

    public class ProductCreateDto : ProductBaseDto { 
        public ICollection<FileCreateDto> Images { get; set; } = null!;
    }

    public class ProductUpdateDto : ProductBaseDto { }

}