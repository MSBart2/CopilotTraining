---
applyTo: "**/{*.tsx,*.jsx,components/**}"
description: "React component standards and patterns for FanHub"
---

# React Component Standards for FanHub

> **Note**: This is a sample custom instructions file that Copilot will automatically include when working with React component files.

When generating or modifying React components, follow these patterns.

## Component Structure

```typescript
// 1. Imports (external, then internal, then styles)
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { useCharacterEpisodes } from '@/hooks/useCharacterEpisodes';

import { Container, EpisodeCard, EpisodeTitle } from './EpisodeAppearances.styles';

// 2. Types/Interfaces (required for FanHub)
interface Episode {
  id: number;
  title: string;
  seasonNumber: number;
  episodeNumber: number;
  airDate: string;
}

interface EpisodeAppearancesProps {
  characterId: number;
  showId: number;
  onEpisodeClick?: (episodeId: number) => void;
  className?: string;
}

// 3. Component (always function, never class)
export function EpisodeAppearances({ 
  characterId, 
  showId, 
  onEpisodeClick,
  className 
}: EpisodeAppearancesProps) {
  // 4. Hooks first (state, context, custom hooks)
  const { data: episodes, isLoading, error, refetch } = useCharacterEpisodes(characterId);
  
  // 5. Callbacks (memoized when passed to children)
  const handleEpisodeClick = useCallback((episodeId: number) => {
    onEpisodeClick?.(episodeId);
  }, [onEpisodeClick]);
  
  // 6. Early returns for loading/error/empty states
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={refetch} />;
  if (!episodes?.length) return <EmptyState message="No episodes found" />;
  
  // 7. Main render
  return (
    <Container className={className}>
      {episodes.map((episode) => (
        <EpisodeCard 
          key={episode.id}
          onClick={() => handleEpisodeClick(episode.id)}
        >
          <EpisodeTitle>
            S{episode.seasonNumber}E{episode.episodeNumber}: {episode.title}
          </EpisodeTitle>
        </EpisodeCard>
      ))}
    </Container>
  );
}
```

## Hook Rules

- Hooks must be called at the top level (not in conditions/loops)
- Custom hooks start with `use`
- Always include ALL dependencies in useEffect/useCallback/useMemo
- Prefer `useCallback` for event handlers passed to children
- Use `useMemo` only for expensive calculations

## TypeScript Patterns (Required)

```typescript
// ✅ Define explicit prop types
interface CharacterCardProps {
  character: Character;
  variant: 'compact' | 'detailed';
  onFavoriteToggle?: (id: number) => void;
  className?: string;
}

// ✅ Use utility types
type CharacterSummary = Pick<Character, 'id' | 'name' | 'imageUrl'>;

// ❌ NEVER use any
// props: any ← This will fail code review
```

## Styling (FanHub Standard)

- Use styled-components for component styles
- NO inline styles (`style={{ }}`)
- Theme values via `${props => props.theme.colors.primary}`
- Support `className` prop for customization
- Use semantic HTML elements

```typescript
// ✅ Good - styled-components
const Container = styled.div`
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.surface};
`;

// ❌ Bad - inline styles
<div style={{ padding: '16px', background: '#fff' }}>
```

## Loading, Error & Empty States (Required)

Every component that fetches data MUST handle:

```typescript
// ✅ Required pattern for data-fetching components
if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} onRetry={refetch} />;
if (!data?.length) return <EmptyState message="No episodes found" />;

// Then render the happy path
return <Container>...</Container>;
```

## Accessibility

- Buttons must have accessible names
- Images must have alt text
- Interactive elements must be keyboard accessible
- Use semantic HTML (nav, main, article, section)
- Include aria-labels where needed
- Clickable non-button elements need `role="button"` and keyboard handling

```typescript
// ✅ Good accessibility
<button aria-label="Add to favorites" onClick={handleFavorite}>
  <HeartIcon />
</button>

<img src={character.imageUrl} alt={`${character.name} portrait`} />

// ✅ Keyboard accessible clickable card
<Card
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
```

## Event Handlers

```typescript
// ✅ Use descriptive handler names
const handleEpisodeClick = useCallback((episodeId: number) => {
  onEpisodeClick?.(episodeId);
}, [onEpisodeClick]);

// ✅ Prevent default when needed
const handleFormSubmit = useCallback((e: React.FormEvent) => {
  e.preventDefault();
  // ... handle submission
}, []);
```

## File Organization

```
components/
├── CharacterCard/
│   ├── CharacterCard.tsx        # Main component
│   ├── CharacterCard.styles.ts  # Styled components
│   ├── CharacterCard.test.tsx   # Tests
│   └── index.ts                 # Re-export
```
