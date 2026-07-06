using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CampBooking.Domain.Constants // using this file so if we have to change the role then we will only need to change this one file which makes the "Single source of truth principle" or dont have to hardcode the Admin or User.
{
    public static class Roles
    {
        public const string Admin = "Admin";
        public const string User = "User";
    }
}
