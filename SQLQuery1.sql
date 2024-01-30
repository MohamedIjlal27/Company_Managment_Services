select EmployeeId, EmployeeFirstName,EmployeeLastName,EmployeeAge, DepartmentName,
convert(varchar(10),DateOfJoining,120) as DateOfJoining
,PhotoFileName
from dbo.Employee E Join Department d on E.DepartmentId = d.DepartmentId

insert into dbo.Employee 
(EmployeeFirstName,EmployeeLastName,EmployeeAge,DepartmentId,DateOfJoining,PhotoFileName)
values('Doni', 'Ivanov', 21, 2, '2021-07-07', 'anonymous.png')

select * from Employee

update dbo.Employee set 
EmployeeFirstName = 'Stefan'
,EmployeeLastName = 'Ivanov'
,DepartmentId = 1
,EmployeeAge = 21
,DateOfJoining = '2021-07-07'
where EmployeeId = 5

create table Client(
	ClientId int NOT NULL PRIMARY KEY IDENTITY(1, 1),
	ClientFirstName varchar(30) not null,
	ClientLastName varchar(30) not null,
	ClientCompanyName varchar(30),
	ClientRequest varchar(100) not null,
	ClientRequestStatus varchar(20) null default('Pending'),
	CONSTRAINT RequestStatus CHECK(ClientRequestStatus IS NULL OR 
	(ClientRequestStatus IN ('Pending', 'Terminated', 'Finished'))),
)

select ClientId,ClientFirstName,ClientLastName,ClientCompanyName,ClientRequest, 
ClientRequestStatus from dbo.Client

insert into dbo.Client 
(ClientFirstName,ClientLastName,ClientCompanyName,ClientRequest,ClientRequestStatus)
values('Marinela', 'Zahova', 'MZahova OOD', 'Company Website', 'Pending')

