if (!context.{ EntityName}
s.Any())
{
    context.{ EntityName}
    s.AddRange(
        new { EntityName } { ShowId = 1, Title = "...", Description = "...", Category = "..." },
        new { EntityName } { ShowId = 1, Title = "...", Description = "...", Category = "..." }
        // generate 12–15 records drawn from the seed source file
    );
    context.SaveChanges();
}
