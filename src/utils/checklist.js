export function getProgress(data) {
    const items = data.flatMap(section => section.items);
    const total = items.length;
    const checked = items.filter(i => i.checked).length;
  
    return {
      total,
      checked,
      percent: total ? Math.round((checked / total) * 100) : 0
    };
  }