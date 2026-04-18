export default function ChecklistCategoryGroups({
  groupedItems,
  expandedGroups,
  focusedItemId,
  itemRefs,
  onToggleGroup,
  onToggleItem,
}) {
  return (
    <section className="list-detail-groups">
      {groupedItems.map((group) => {
        const isExpanded = expandedGroups[group.category];
        const completedCount = group.items.filter((item) => item.checked).length;

        return (
          <div key={group.category} className="list-detail-group">
            <button
              type="button"
              className="list-detail-group-toggle"
              onClick={() => onToggleGroup(group.category)}
            >
              <div className="list-detail-group-main">
                <span
                  className={`list-detail-group-arrow ${
                    isExpanded ? "list-detail-group-arrow--open" : ""
                  }`}
                >
                  ▾
                </span>

                <div className="list-detail-group-texts">
                  <h2>{group.category}</h2>
                  <small>
                    {completedCount}/{group.items.length} cochés
                  </small>
                </div>
              </div>

              <span className="list-detail-group-count">
                {group.items.length} éléments
              </span>
            </button>

            {isExpanded ? (
              <div className="list-detail-items">
                {group.items.map((item) => {
                  const isFocused = focusedItemId === item.id;

                  return (
                    <label
                      key={item.id}
                      ref={(element) => {
                        itemRefs.current[item.id] = element;
                      }}
                      className={`list-detail-item ${
                        isFocused ? "list-detail-item--focused" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => onToggleItem(item.id)}
                      />
                      <span>{item.label}</span>
                    </label>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </section>
  );
}
