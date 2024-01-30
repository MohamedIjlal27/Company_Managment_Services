using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Intern
    {
        public int InternId { get; set; }
        public string InternFirstName { get; set; }
        public string InternLastName { get; set; }
        public int InternAge { get; set; }
        public int DepartmentId { get; set; }
        public string DateOfJoining { get; set; }
        public string PhotoFileName { get; set; }
    }
}
