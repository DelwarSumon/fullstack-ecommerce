using System.Net;

namespace backend.Helpers
{
    public class ServiceException : Exception
    {
        public HttpStatusCode StatusCode { get; set; }
        // public string Message { get; set; }

        public ServiceException(HttpStatusCode statusCode, string message) : base(message)
        {
            StatusCode = statusCode;
            // Message = message;
        }

        public static ServiceException NotFound(string message = "Id is not found")
        {
            return new ServiceException(HttpStatusCode.NotFound, message);
        }

        public static ServiceException Unauthorized(string message = "Unauthorized")
        {
            return new ServiceException(HttpStatusCode.Unauthorized, message);
        }

        public static ServiceException BadRequest(string message = "Bad Request")
        {
            return new ServiceException(HttpStatusCode.BadRequest, message);
        }

    }
}