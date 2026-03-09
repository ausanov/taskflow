FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app
COPY src/ .
RUN dotnet restore TaskFlow.API/TaskFlow.API.csproj
RUN dotnet publish TaskFlow.API/TaskFlow.API.csproj -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /out .
ENTRYPOINT ["dotnet", "TaskFlow.API.dll"]
