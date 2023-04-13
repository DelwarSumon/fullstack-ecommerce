namespace backend.Helpers
{
    public class ServiceHash
    {
        public static void CreateHashData(string input, out byte[] inputHash, out byte[] inputSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                inputSalt = hmac.Key;
                inputHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(input));
            }
        }

        public static Task<bool> CompareHashData(string input, byte[] inputHash, byte[] inputSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(inputSalt))
            {
                var computedInput = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(input));
                return Task.FromResult(computedInput.SequenceEqual(inputHash));
            }
        }
    }
}