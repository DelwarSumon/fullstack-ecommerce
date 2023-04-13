namespace backend.DTOs
{
    public class FileBaseDto
    {
        public string Url { get; set; } = null!;
    }

    public class FileReadDto : FileBaseDto
    {
        public Guid Id { get; set; }
    }

    public class FileCreateDto : FileBaseDto
    {
        public Guid? UserId { get; set; }
        public Guid? ProductId { get; set; }
        public Guid? CategoryId { get; set; }
    }

    public class FileUpdateDto : FileBaseDto
    {

        public Guid? UserId { get; set; }
        public Guid? ProductId { get; set; }
        public Guid? CategoryId { get; set; }
    }
}