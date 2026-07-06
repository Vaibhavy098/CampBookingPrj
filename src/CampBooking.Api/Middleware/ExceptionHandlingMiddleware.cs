using System.Net;
using CampBooking.Application.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace CampBooking.Api.Middleware;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(
        RequestDelegate next,
        ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception exception)
        {
            _logger.LogError(exception, "Unhandled exception occurred while processing {Method} {Path}", context.Request.Method, context.Request.Path);

            await HandleExceptionAsync(context, exception);
        }
    }

    private static async Task HandleExceptionAsync(
        HttpContext context,
        Exception exception)
    {
        var response = new ProblemDetails // used this instead of creating a custom error response class to leverage the built-in ProblemDetails class in ASP.NET Core (as ASP.NET core has a standard response format called RFC 7807 problem details).
        {
            Detail = exception.Message
        };

        switch (exception)
        {
            case ValidationException:
                response.Status = StatusCodes.Status400BadRequest;
                response.Title = "Validation Error";
                break;

            case UnauthorizedException:
                response.Status = StatusCodes.Status401Unauthorized;
                response.Title = "Unauthorized";
                break;

            case ForbiddenException:
                response.Status = StatusCodes.Status403Forbidden;
                response.Title = "Forbidden";
                break;

            case NotFoundException:
                response.Status = StatusCodes.Status404NotFound;
                response.Title = "Resource Not Found";
                break;

            case ConflictException:
                response.Status = StatusCodes.Status409Conflict;
                response.Title = "Conflict";
                break;

            default:
                response.Status = StatusCodes.Status500InternalServerError;
                response.Title = "Internal Server Error";
                response.Detail = exception.Message;
                break;
        }

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = response.Status.Value;

        await context.Response.WriteAsJsonAsync(response);
    }
}
