using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Client
    {
        public int ClientId { get; set; }
        public string ClientFirstName { get; set; }
        public string ClientLastName { get; set; }
        public string ClientCompanyName { get; set; }
        public string ClientRequest { get; set; }
        public string ClientRequestStatus { get; set; }
    }
}
