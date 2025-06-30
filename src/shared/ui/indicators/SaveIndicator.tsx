export const SaveIndicator = ({ isSaving, isEditing }: { isSaving: boolean, isEditing: boolean }) =>
  isSaving || isEditing ? (
    <span style={{ marginLeft: "10px", color: "#666" }}>Сохранение...</span>
  ) : (
    <span style={{ marginLeft: "10px", color: "green" }}>✓ Сохранено</span>
  );