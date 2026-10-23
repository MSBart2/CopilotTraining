---
agent: 'agent'
description: 'Generate a detail page following our proven Character Detail pattern'
---

# Create Detail Page

Generate a detail page component for **{{entity_name}}** following our established patterns.

## Context

Reference these project files for patterns and architecture:
- `docs/ARCHITECTURE.md` for data flow and component structure
- `.github/copilot-instructions.md` for coding standards
- `frontend/src/pages/CharacterDetail.jsx` as the template pattern (if it exists)

## API Configuration

- **Endpoint**: `{{api_endpoint}}`
- **Display Fields**: {{display_fields}}
- **Related Entities**: {{related_entities}}

## Requirements

### Component Structure

1. **Page Component**: Create `frontend/src/pages/{{entity_name}}Detail.jsx`
2. **Follow the CharacterDetail pattern**:
   - Functional component with hooks
   - useParams() for route parameter
   - useState for data, loading, and error states
   - useEffect for data fetching

### Data Fetching

```javascript
// Pattern to follow:
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`${endpoint}`);
      setData(response.data);
    } catch (err) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, [id]);
```

### UI Structure

1. **Loading State**: Show a loading indicator while fetching
2. **Error State**: Display user-friendly error message with retry option
3. **Success State**: 
   - Header with primary field (name/title)
   - Card-based layout for main details
   - Section for each related entity type
   - Back navigation link

### Edge Cases to Handle

- Entity not found (404)
- Missing optional fields (show placeholder or hide)
- Empty related entities (show "No items" message)
- Network errors (show retry button)
- Long text content (truncate with "Read more")

### Styling

- Use CSS Modules (create `{{entity_name}}Detail.module.css`)
- Follow existing styling patterns from other detail pages
- Mobile-responsive layout
- Consistent spacing and typography

## Output

Create the following files:
1. `frontend/src/pages/{{entity_name}}Detail.jsx` - The page component
2. `frontend/src/pages/{{entity_name}}Detail.module.css` - Component styles
3. Add route to `frontend/src/App.js` if not present

## Example Usage

For Episode Detail with:
- entity_name: Episode
- api_endpoint: /api/episodes/:id
- display_fields: title, air_date, season_number, episode_number, synopsis, runtime
- related_entities: quotes, characters

We want the result to match the quality and pattern of CharacterDetail.jsx.
