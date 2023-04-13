using System.ComponentModel.DataAnnotations;
using backend.Models;

namespace backend.DTOs
{
    public class UserBaseDto
    {
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
    }

    public class UserReadDto : UserBaseDto
    {
        public Guid Id { get; set; }
        public Role Role { get; set; }
        public FileReadDto Image { get; set; } = null!;
    }

    public class UserCreateDto : UserBaseDto
    {
        [MaxLength(50)]
        public string Password { get; set; } = null!;
        public FileCreateDto Image { get; set; } = null!;
    }

    public class UserUpdateDto : UserBaseDto
    {
        public string Password { get; set; } = null!;
    }
}