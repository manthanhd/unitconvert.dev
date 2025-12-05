import type { RecentConversion } from '../hooks/useRecentConversions';

interface RecentConversionsProps {
  recents: RecentConversion[];
  onSelect: (fromUnitId: string, toUnitId: string, fromValue: string) => void;
  onRemove: (fromUnitId: string, toUnitId: string) => void;
}

export function RecentConversions({ recents, onSelect, onRemove }: RecentConversionsProps) {
  if (recents.length === 0) {
    return null;
  }

  return (
    <div className="recent-conversions">
      <h3 className="recent-conversions__title">Recent</h3>
      <div className="recent-conversions__list">
        {recents.map((recent) => (
          <div
            key={`${recent.fromUnitId}-${recent.toUnitId}`}
            className="recent-conversion-item"
          >
            <button
              type="button"
              className="recent-conversion-item__button"
              onClick={() => onSelect(recent.fromUnitId, recent.toUnitId, recent.fromValue)}
              aria-label={`${recent.fromValue} ${recent.fromUnitName} equals ${recent.toValue} ${recent.toUnitName}`}
            >
              <span className="recent-conversion-item__text">
                {recent.fromValue} {recent.fromUnitName} = {recent.toValue} {recent.toUnitName}
              </span>
            </button>
            <button
              type="button"
              className="recent-conversion-item__delete"
              onClick={() => onRemove(recent.fromUnitId, recent.toUnitId)}
              aria-label="Remove from recent"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
