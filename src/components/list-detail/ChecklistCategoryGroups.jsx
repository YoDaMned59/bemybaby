import { useState } from "react";
import { isCustomChecklistItem } from "../../utils/checklistItems";

export default function ChecklistCategoryGroups({
  groupedItems,
  expandedGroups,
  focusedItemId,
  itemRefs,
  onToggleGroup,
  onToggleItem,
  onAddCustomItem,
  onRemoveCustomItem,
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
                  const custom = isCustomChecklistItem(item);

                  return (
                    <div
                      key={item.id}
                      ref={(element) => {
                        itemRefs.current[item.id] = element;
                      }}
                      className={`list-detail-item-wrap ${
                        isFocused ? "list-detail-item-wrap--focused" : ""
                      }`}
                    >
                      <label className="list-detail-item">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => onToggleItem(item.id)}
                        />
                        <span>{item.label}</span>
                      </label>
                      {custom ? (
                        <button
                          type="button"
                          className="list-detail-item-remove"
                          aria-label={`Supprimer ${item.label}`}
                          onClick={() => onRemoveCustomItem(item.id)}
                        >
                          Retirer
                        </button>
                      ) : null}
                    </div>
                  );
                })}

                <CategoryAddRow
                  category={group.category}
                  onAdd={(label) => onAddCustomItem(group.category, label)}
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </section>
  );
}

function CategoryAddRow({ category, onAdd }) {
  const [draft, setDraft] = useState("");

  function submit() {
    const value = draft.trim();
    if (!value) {
      return;
    }

    onAdd(value);
    setDraft("");
  }

  return (
    <div className="list-detail-add-row">
      <input
        type="text"
        className="list-detail-add-input"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            submit();
          }
        }}
        placeholder="Ajouter une ligne…"
        aria-label={`Ajouter un élément dans ${category}`}
      />
      <button type="button" className="list-detail-add-btn" onClick={submit}>
        Ajouter
      </button>
    </div>
  );
}
