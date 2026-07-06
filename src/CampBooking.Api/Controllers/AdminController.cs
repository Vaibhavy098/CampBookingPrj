using Microsoft.AspNetCore.Mvc;

namespace CampBooking.Api.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
