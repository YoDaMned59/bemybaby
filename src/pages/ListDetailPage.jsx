import { useParams } from "react-router-dom";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { babyChecklist } from "../data/babyChecklist";
import { maternityBagChecklist } from "../data/maternityBagChecklist";
import { adminChecklist } from "../data/adminChecklist";
import { getProgress } from "../utils/checklist";
import "./ListDetailPage.css";

export default function ListDetailPage() {
  const { listId } = useParams();

  const [baby, setBaby] = useLocalStorage("bmb-list-baby", babyChecklist);
  const [bag, setBag] = useLocalStorage("bmb-list-bag", maternityBagChecklist);
  const [admin, setAdmin] = useLocalStorage("bmb-list-admin", adminChecklist);

  let data = baby;
  let setData = setBaby;
  let title = "Liste bébé";

  if (listId === "bag") {
    data = bag;
    setData = setBag;
    title = "Valise maternité";
  }

  if (listId === "admin") {
    data = admin;
    setData = setAdmin;
    title = "Démarches administratives";
  }

  const progress = getProgress(data);
  const [newItems, setNewItems] = useState({});

  function toggle(id) {
    const updated = data.map((section) => ({
      ...section,
      items: section.items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      ),
    }));
    setData(updated);
  }

  function addItem(category) {
    const label = (newItems[category] || "").trim();
    if (!label) return;

    const updated = data.map((section) =>
      section.category === category
        ? {
            ...section,
            items: [
              ...section.items,
              {
                id: Date.now(),
                label,
                checked: false,
              },
            ],
          }
        : section
    );

    setData(updated);
    setNewItems((prev) => ({ ...prev, [category]: "" }));
  }

  function deleteItem(id) {
    const updated = data.map((section) => ({
      ...section,
      items: section.items.filter((item) => item.id !== id),
    }));
    setData(updated);
  }

  return (
    <div className="list-detail-page">
      <h1>{title}</h1>

      <div className="card">
        <div className="progress-wrap">
          <div
            className="progress-fill"
            style={{ width: `${progress.percent}%` }}
          />
        </div>
        <p>
          {progress.checked} / {progress.total} ({progress.percent}%)
        </p>
      </div>

      {data.map((section) => (
        <div key={section.category} className="card">
          <h2>{section.category}</h2>

          {section.items.map((item) => (
            <div
              key={item.id}
              className={`item-row ${item.checked ? "done" : ""}`}
              onClick={() => toggle(item.id)}
            >
              <div className="item-left">
                <div className={`checkbox ${item.checked ? "checked" : ""}`}>
                  {item.checked && "✓"}
                </div>
                <span>{item.label}</span>
              </div>

              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteItem(item.id);
                }}
              >
                ✕
              </button>
            </div>
          ))}

          <div className="add-item">
            <input
              type="text"
              value={newItems[section.category] || ""}
              onChange={(e) =>
                setNewItems((prev) => ({
                  ...prev,
                  [section.category]: e.target.value,
                }))
              }
              placeholder="Ajouter un élément"
            />
            <button onClick={() => addItem(section.category)}>Ajouter</button>
          </div>
        </div>
      ))}
    </div>
  );
}