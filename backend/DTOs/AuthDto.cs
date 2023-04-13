namespace backend.DTOs
{
    public class AuthDto
    {
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
    }

    public class AuthReadDto
    {
        public string Token { get; set; } = null!;
        public DateTime Expiration { get; set; }
    }
}