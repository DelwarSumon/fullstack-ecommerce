namespace backend.DTOs
{
    public class CategoryBaseDto
    {
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
    }

    public class CategoryReadDto : CategoryBaseDto
    {
        public Guid Id { get; set; }
    }

    public class CategoryCreateDto : CategoryBaseDto { }

    public class CategoryUpdateDto : CategoryBaseDto { }
}