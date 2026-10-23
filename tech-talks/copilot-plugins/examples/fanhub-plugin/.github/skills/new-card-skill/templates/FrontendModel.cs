namespace Frontend.Models;

public class { EntityName }
{
    public int Id { get; set; }
public int ShowId { get; set; }
// Mirror each backend property exactly — same names, same types, same order.
// No EF attributes, no navigation properties. e.g.:
public string Title { get; set; }
public string Description { get; set; }
public string Category { get; set; }
}
