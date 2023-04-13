using System.Text.Json.Serialization;
using backend.Database;
using backend.Repositories.CategoryRepo;
using backend.Services.CategoryService;
using backend.Repositories.ProductRepo;
using backend.Services.ProductService;
using backend.Repositories.UserRepo;
using backend.Services.UserService;
using backend.Middlewares;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using backend.Repositories.AuthRepo;
using backend.Services.AuthService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using backend.Authorization;
using Microsoft.AspNetCore.Authorization;
using backend.Repositories.FileRepo;
using backend.Services.FileService;
using backend.Repositories.OrderRepo;
using backend.Services.OrderService;
using backend.Repositories.OrderItemRepo;
using backend.Services.OrderItemService;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseKestrel(options =>
{
    options.ListenLocalhost(5000); //http: no data encription
    options.ListenLocalhost(5001, options => options.UseHttps()); // https: with encription
});

builder.Services.Configure<RouteOptions>(options =>
{
    options.LowercaseUrls = true;
});

// Add services to the container.
builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        // Fix the JSON cycle issue
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
    {
        options.AddSecurityDefinition(
            "oauth2",
            new OpenApiSecurityScheme
            {
                Description = "Bearer token authentication",
                Name = "Authorization",
                In = ParameterLocation.Header,
            }
        );
        options.OperationFilter<SecurityRequirementsOperationFilter>();
    });

builder.Services.AddDbContext<DatabaseContext>();
builder.Services.AddAutoMapper(typeof(Program).Assembly);


// Register the services for dependency injection
builder.Services
    .AddScoped<IUserRepo, UserRepo>()
    .AddScoped<IUserService, UserService>()
    .AddScoped<ICategoryRepo, CategoryRepo>()
    .AddScoped<ICategoryService, CategoryService>()
    .AddScoped<IProductRepo, ProductRepo>()
    .AddScoped<IProductService, ProductService>()
    .AddScoped<IAuthRepo, AuthRepo>()
    .AddScoped<IAuthService, AuthService>()
    .AddScoped<IFileRepo, FileRepo>()
    .AddScoped<IFileService, FileService>()
    .AddScoped<IOrderRepo, OrderRepo>()
    .AddScoped<IOrderService, OrderService>()
    .AddScoped<IOrderItemRepo, OrderItemRepo>()
    .AddScoped<IOrderItemService, OrderItemService>();

builder.Services
    .AddTransient<ErrorHandlerMiddleware>()
    .AddTransient<LoggerMiddleware>();

builder.Services
    .AddTransient<IAuthorizationHandler, UpdateUserHandler>();


/* add configuration for authentication middleware */
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            ValidateIssuer = false,
            ValidateAudience = false,
            IssuerSigningKey = new SymmetricSecurityKey(
                System.Text.Encoding.UTF8.GetBytes(
                    builder.Configuration.GetSection("AppSettings:Token").Value!
                )
            )
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("react-policy",
        builder =>
    {
        builder.WithOrigins("http://localhost:3000")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .SetIsOriginAllowedToAllowWildcardSubdomains();
    });
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
    options.AddPolicy("AdminOrOwner", policy => policy.AddRequirements(new UpdateUserRequirement()));
});

var app = builder.Build();

app.UseHttpsRedirection();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
        {
            options.SwaggerEndpoint("/swagger/v1/swagger.json", "Demo");
            options.RoutePrefix = string.Empty;
        }
    );
    app.UseCors("react-policy");
}

app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseMiddleware<LoggerMiddleware>();

app.UseAuthentication(); /* check if user exists in database ? */

app.UseAuthorization();

app.MapControllers();

app.Run();
