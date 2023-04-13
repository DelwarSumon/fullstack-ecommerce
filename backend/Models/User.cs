using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User : BaseModel
    {
        public string Name { get; set; } = null!;
        [EmailAddressAttribute]
        public string Email { get; set; } = null!;
        public Role Role { get; set; } = Role.Customer;
        public byte[] Password { get; set; } = null!;
        public byte[] Salt { get; set; } = null!;
        public FileModel Image { get; set; } = null!;
    }

    public enum Role
    {
        Admin,
        Customer
    }
}