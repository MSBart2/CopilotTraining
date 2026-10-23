using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class { EntityName }
Controller : ControllerBase
{
    private readonly FanHubContext _context;

public { EntityName }
Controller(FanHubContext context)
{
    _context = context;
}

[HttpGet]
public async Task<IActionResult> Get { EntityName }
s()
{
    var items = await _context.{ EntityName}
    s.ToListAsync();
    return Ok(items);
}

[HttpPost]
public async Task<IActionResult> Create { EntityName }
([FromBody] {EntityName} entity)
    {
        _context.{EntityName}s.Add(entity);
await _context.SaveChangesAsync();
return Ok(entity);
    }
}
