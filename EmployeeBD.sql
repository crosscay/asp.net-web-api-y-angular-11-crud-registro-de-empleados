USE [EmployeeBD]
GO
/****** Object:  Table [dbo].[Employee]    Script Date: 28/02/2021 21:59:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employee](
	[EmployeeID] [int] IDENTITY(1,1) NOT NULL,
	[FullName] [varchar](50) NULL,
	[EMPCode] [varchar](20) NULL,
	[Mobile] [varchar](50) NULL,
	[Position] [varchar](50) NULL,
 CONSTRAINT [PK_Employee] PRIMARY KEY CLUSTERED 
(
	[EmployeeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Employee] ON 
GO
INSERT [dbo].[Employee] ([EmployeeID], [FullName], [EMPCode], [Mobile], [Position]) VALUES (9, N'reina espinoza', N'222', N'966666666', N'contadora')
GO
INSERT [dbo].[Employee] ([EmployeeID], [FullName], [EMPCode], [Mobile], [Position]) VALUES (10, N'daniel salcedo', N'333', N'955555555', N'administrador')
GO
INSERT [dbo].[Employee] ([EmployeeID], [FullName], [EMPCode], [Mobile], [Position]) VALUES (11, N'ramon ortega', N'111', N'960888888', N'diseñador')
GO
INSERT [dbo].[Employee] ([EmployeeID], [FullName], [EMPCode], [Mobile], [Position]) VALUES (12, N'milagros basanta', N'555', N'960222222', N'secretaria')
GO
SET IDENTITY_INSERT [dbo].[Employee] OFF
GO
