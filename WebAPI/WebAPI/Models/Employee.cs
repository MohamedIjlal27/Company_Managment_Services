using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; } 
        public string EmployeeFirstName { get; set; }
        public string EmployeeLastName { get; set; }
        public int EmployeeAge { get; set; }
        public int DepartmentId { get; set; }
        public string DateOfJoining { get; set; }
        public string PhotoFileName { get; set; }

        /*[ForeignKey("DepartmentId")]
        public Department EmployeeDep { get; set; }*/
    }
}
